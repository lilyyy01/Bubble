import mongoose from 'mongoose';

// Define an interface for the Attendee document that extends the mongoose Document
export interface Attendees extends mongoose.Document {
  event_id: mongoose.Types.ObjectId;
  user_id: mongoose.Types.ObjectId;
}

// Create the schema using the TypeScript interface
const AttendeeSchema = new mongoose.Schema<Attendees>({
  event_id: { type: mongoose.Schema.Types.ObjectId, required: true, ref: 'Event' },
  user_id: { type: mongoose.Schema.Types.ObjectId, required: true, ref: 'User' },
});

// Create the model from the schema
export default mongoose.models.Attendee || mongoose.model<Attendees>('Attendee', AttendeeSchema);

/*
Interface IAttendee: Defines the shape of an Attendee document. This interface extends the basic Document type from Mongoose, 
adding specific fields (event_id, user_id, and role) with their types.
Schema Definition: The schema is defined using the mongoose.Schema constructor with the IAttendee interface. 
This provides strong typing within the schema definition.
Role Enumeration: The role field is defined to be an enum that accepts either "HOST" or "ATTENDEE", with "ATTENDEE" as the default value.
Model Creation: The model is created by calling mongoose.model with the name 'Attendee' and the defined schema. 
This model can then be used to interact with the attendees collection in your MongoDB database.
TypeScript Exports: The model is exported using export default Attendee;, making it available for import in other parts 
of your TypeScript application.
*/