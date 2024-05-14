import mongoose, { Document } from 'mongoose';

interface IMember extends Document {
  community: mongoose.Types.ObjectId;
  individual: mongoose.Types.ObjectId;
  primary: Boolean;
}

const memberSchema = new mongoose.Schema<IMember>({
  community: { type: mongoose.Schema.Types.ObjectId, required: true, ref: 'Community' },
  individual: { type: mongoose.Schema.Types.ObjectId, required: true, ref: 'User' },
  primary: { type: Boolean, default: true }
});

const Member = mongoose.model<IMember>('Member', memberSchema);

export default Member;