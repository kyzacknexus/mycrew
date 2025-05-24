import mongoose, { Schema, Document } from 'mongoose';

export interface IBet extends Document {
  userId: mongoose.Types.ObjectId;
  opponent: mongoose.Types.ObjectId;
  amount: number;
  createdAt: Date;
}

const BetSchema = new Schema<IBet>({
  userId: { type: Schema.Types.ObjectId, ref: 'User', required: true },
  opponent: { type: Schema.Types.ObjectId, ref: 'User', required: true },
  amount: { type: Number, required: true },
  createdAt: { type: Date, default: Date.now }
});

const Bet = mongoose.model<IBet>('Bet', BetSchema);
export default Bet;