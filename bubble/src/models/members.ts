import mongoose from 'mongoose';

// Define an interface for the Attendee document that extends the mongoose Document
export interface Members extends mongoose.Document {
  community_id: mongoose.Types.ObjectId;
  user_id: mongoose.Types.ObjectId;
}

// Create the schema using the TypeScript interface
const MemberSchema = new mongoose.Schema<Members>({
  community_id: { type: mongoose.Schema.Types.ObjectId, required: true, ref: 'Community' },
  user_id: { type: mongoose.Schema.Types.ObjectId, required: true, ref: 'User' },
});

// Create the model from the schema
export default mongoose.models.Member || mongoose.model<Members>("Member", MemberSchema);
