import mongoose, { Schema, Document } from 'mongoose';
import bcrypt from 'bcryptjs';

export interface IUser extends Document {
  name: string;
  email: string;
  password: string;
  company?: string;
  plan: 'free' | 'starter' | 'pro' | 'enterprise';
  shipmentsUsed: number;
  planExpiry?: Date;
  comparePassword(p: string): Promise<boolean>;
}

const UserSchema = new Schema<IUser>({
  name: { type: String, required: true, trim: true },
  email: { type: String, required: true, unique: true, lowercase: true },
  password: { type: String, required: true },
  company: { type: String, trim: true },
  plan: { type: String, enum: ['free', 'starter', 'pro', 'enterprise'], default: 'free' },
  shipmentsUsed: { type: Number, default: 0 },
  planExpiry: Date,
}, { timestamps: true });

UserSchema.pre('save', async function (next) {
  if (!this.isModified('password')) return next();
  this.password = await bcrypt.hash(this.password, 12);
  next();
});

UserSchema.methods.comparePassword = function (p: string) {
  return bcrypt.compare(p, this.password);
};

export default mongoose.models.User || mongoose.model<IUser>('User', UserSchema);
