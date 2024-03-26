import connectDB from '@/config/database';
import Property from '@/models/Property';

// GET /api/properties
export const GET = async (request) => {
  try {
    await connectDB();

    const properties = await Property.find({});

    return new Response(JSON.stringify(properties), {
      status: 200,
      headers: {
        'Content-Type': 'text/plain',
      },
    });
  } catch (error) {
    console.log(error);
    return new Response(error.message || error.toString(), {
      status: 500,
    });
  }
};
