import connectDB from '@/config/database';
import Message from '@/models/Message';
import { getSessionUser } from '@/utils/getSessionUser';

export const dynamic = 'force-dynamic';

// POST /api/messages
export const POST = async (req, res) => {
  try {
    await connectDB();

    const { name, email, phone, message, property, recipient } =
      await req.json();

    const sessionUser = await getSessionUser();

    if (!sessionUser || !sessionUser.user) {
      return new Response(
        JSON.stringify({
          message: 'You must be logged in to send the message',
        }),
        { status: 401 }
      );
    }

    const { user } = sessionUser;

    // Can not send message to self
    if (user.id === recipient) {
      // if we will use this message that we will send it as an object
      return new Response(
        JSON.stringify({ message: 'You can not send message to yourself' }),
        {
          status: 400,
        }
      );
    }

    const newMessage = new Message({
      sender: user.id,
      recipient,
      property,
      name,
      email,
      phone,
      body: message,
    });

    await newMessage.save();

    return new Response(
      JSON.stringify({ message: 'Message sent successfully' }),
      {
        status: 200,
      }
    );
  } catch (error) {
    console.log(error);
    return new Response(
      JSON.stringify({ message: 'Error sending message, backend' }),
      {
        status: 500,
      }
    );
  }
};
