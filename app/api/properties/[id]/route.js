import connectDB from '@/config/database';
import Property from '@/models/Property';

// GET /api/properties/:id
export const GET = async (request, { params }) => {
  try {
    await connectDB();

    const property = await Property.findById(params.id);

    if (!property) {
      return new Response('Property not found', {
        status: 404,
      });
    }

    return new Response(JSON.stringify(property), {
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
