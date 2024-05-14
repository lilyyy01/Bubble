import mongoose from 'mongoose';

export interface Communities extends mongoose.Document {
  name: string;
  geo_loc?: string; // Optional until you decide on how to handle locations
  // Consider adding a field for the picture if needed.
}

const CommunitySchema = new mongoose.Schema<Communities>({
  name: { type: String, required: true, index: true },
  geo_loc: { type: String }, // Placeholder for geo-location data; consider using GeoJSON for actual geographic data handling.
  // When you decide to add a picture, it can be a URL string or a reference to a file storage location.
});

export default mongoose.models.Community || mongoose.model<Communities>('Community', CommunitySchema);


/*
Key Points:
The ICommunity interface extends Document, providing strong typing for Community documents. 
This includes any methods or properties that Mongoose documents typically have, in addition to the custom fields you've defined.

The geo_loc field is currently defined as a string. For more complex geographical data, 
Mongoose supports GeoJSON objects, which can be used to store more detailed location data. 
You might want to explore GeoJSON types supported by Mongoose if you plan to implement more sophisticated location-based features.

Optional fields are marked with ? in the interface definition, indicating that they are not required to create a Community document.

If you decide to add a picture to the community model, you might store it as a URL pointing to where the picture is 
hosted or use a binary data type if storing the image directly in the database. How to implement this will depend 
on your application's requirements and the size of the images you plan to store.
*/