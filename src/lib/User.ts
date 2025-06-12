import mongoose, { Schema, Document } from 'mongoose';

interface IUser extends Document {
  name: string;
  email: string;
  password: string;
  roles: string[]; // roles like ['user', 'admin']
}

const userSchema: Schema<IUser> = new Schema({
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  roles: { type: [String], default: ['user'] }, // default role is 'user'
});

const User = mongoose.models.User || mongoose.model<IUser>('User', userSchema);

export default User;
