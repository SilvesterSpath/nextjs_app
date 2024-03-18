import connectDB from '@/config/database';

export const GET = async (request) => {
  try {
    await connectDB();
    return new Response(JSON.stringify({ message: 'Hello World!' }), {
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
