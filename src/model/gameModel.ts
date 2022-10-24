import mongoose, { Document, Model, Schema } from 'mongoose';

export interface Game extends Document{
  id: number;
  title: string;
  user: string;
}

const schema = new mongoose.Schema(
  {
  id: {type: Number, require: true},
  title: {type: String, require: true}, 
  user: { type: Schema.Types.ObjectId, ref: 'User', required: true }
  },
  {
    toJSON: {
      transform: (_, ret): void => {
        ret.id = ret._id.toString();
        delete ret._id;
        delete ret.__v;
      },
    },
  }
);

export const GameModel: Model<Game> = mongoose.model('Games', schema);