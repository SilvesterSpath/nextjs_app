import connectDB from '@/config/database';
import Property from '@/models/Property';
import { getSessionUser } from '@/utils/getSessionUser';

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

// DELETE /api/properties/:id
export const DELETE = async (request, { params }) => {
  try {
    await connectDB();

    // authorization process
    const property = await Property.findById(params.id);
    const sessionUser = await getSessionUser();

    if (!sessionUser || !sessionUser.userId) {
      return new Response('Unauthorized', {
        status: 401,
      });
    }

    const { userId } = sessionUser;

    if (!property) {
      return new Response('Property not found', {
        status: 404,
      });
    }

    // Verify ownership
    if (property.owner.toString() !== userId) {
      return new Response('Unauthorized', {
        status: 401,
      });
    }

    await property.deleteOne();

    return new Response('Property deleted', {
      status: 200,
    });
  } catch (error) {
    console.log(error);
    return new Response(error.message || error.toString(), {
      status: 500,
    });
  }
};
