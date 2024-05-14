import mongoose from 'mongoose';

export interface Tags extends mongoose.Document {
  name: string;
  color: string;
}

const TagSchema = new mongoose.Schema<Tags>({
  name: { type: String, required: true },
  color: { type: String, required: true },
  // You can add more fields as needed
});

export default mongoose.models.Tags || mongoose.model<Tags>("Tag", TagSchema)

/*
Notes:

Interface ITag extends Document: This interface extends Mongoose's Document type, allowing it to be used as the type 
for documents returned from queries on the Tag model. It includes all the properties you expect to find on a Tag document.

Use of import statements: The CommonJS require calls are replaced with ES Module import statements, 
which is the standard in TypeScript for importing modules.

Defining the schema: The schema is defined with the type Schema<ITag>, indicating that it will be used to create documents of type ITag.

Exporting the model: The model is exported using export default Tag;, making it available for import in other parts of your application.
*/
