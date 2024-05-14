import mongoose from 'mongoose';

export interface Events extends mongoose.Document {
  event_name: string;
  community: mongoose.Types.ObjectId;
  location: string;
  host: mongoose.Types.ObjectId;
  date: Date;
  time: Number;
  creation_date: Date;
  description?: string;
  tags?: mongoose.Types.ObjectId[];
  class_limit?: number[];
  max_spots?: number;
  num_attendees: number;
}

const EventSchema = new mongoose.Schema<Events>({
  event_name: { type: String, required: true, maxlength: 40 },
  community: { type: mongoose.Schema.Types.ObjectId, required: true, ref: "Community" },
  location: { type: String, required: true, maxlength: 100 },
  host: { type: mongoose.Schema.Types.ObjectId, required: true, index: true },
  date: { type: Date, required: true },
  time: { type: Number, required: true }, // For example 0700, 1430
  creation_date: { type: Date, default: Date.now }, // Use Date.now for the default value to set to the current date/time
  description: { type: String, required: false, maxlength: 200 },
  tags: [{ type: mongoose.Schema.Types.ObjectId, ref: "Tag", required: false, index: true }],
  class_limit: [Number],
  max_spots: { type: Number, required: false },
  num_attendees: { type: Number, required: true, default: 0},
});

EventSchema.path("date").validate(function (value: Date) {
	let today: Date = new Date();
  return value >= today;
}, "date before today");


// The class_limit data should be stored as an array of two numbers [youngestClass, oldestClass]
// Note: this means that the first number will be larger
EventSchema.path("class_limit").validate(function (value: any) {
	if (!Array.isArray(value) || value.length !== 2) { 
    return false; 
  }
	if (value[0] < value[1]) { 
    return false; 
  }

	// Ensure that everyone invited is at least a freshman
	let today: Date = new Date();
	let year: number = Number(today.getFullYear());
	return value[0] <= year + 4;
});

// Ensuring that the maximum number of spots available for an event is more than 0
EventSchema.path("max_spots").validate(function (value: number) {
	return value > 0;
});

const Event = mongoose.model<Events>('Event', EventSchema);

export default Event;


/*
Notes:

The Date type is used for both date_time and creation_date fields instead of DateTime, which is not a valid Mongoose type. 

The creation_date field is set to default to the current date using Date.now.

For the tags field, you might want to reference another schema (assuming you have a Tag model). 

The reference (ref: "Tag") is added based on the assumption you have or will have a Tag schema.

Additional validation for fields like date_time (to ensure it's in the future) and 
class_limit (to ensure the numbers are in the correct order if present) would need to be 
implemented as custom validation logic within your schema or through middleware.

The Document interface from Mongoose is extended to ensure your event document can use Mongoose methods and properties, 
providing strong typing for document instances.
*/
