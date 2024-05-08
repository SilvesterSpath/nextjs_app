import { Schema, model, models } from 'mongoose';

const MessageSchema = new Schema({
  // logged in user
  sender: {
    type: Schema.Types.ObjectId,
    ref: 'User',
    required: true,
  },
  // property owner
  recipient: {
    type: Schema.Types.ObjectId,
    ref: 'User',
    required: true,
  },

  property: {
    type: Schema.Types.ObjectId,
    ref: 'Property',
    required: true,
  },
});
