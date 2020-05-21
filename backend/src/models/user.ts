import mongoose, { Schema, Document } from 'mongoose';
import uniqueValidator from 'mongoose-unique-validator';
import { UserAnyType, UniversalUser } from '../types';

const userSchema: Schema = new Schema({
  username: {
    type: String,
    minlength: 3,
    unique: true
  },
  type: String,
  name: String,
  passwordHash: String,
  museums: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'MuseumMon'
    }
  ],
});

userSchema.plugin(uniqueValidator);

export default mongoose.model<UniversalUser & Document>('UserMon', userSchema);