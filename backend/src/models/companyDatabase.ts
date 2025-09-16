import mongoose, { Schema, Document } from "mongoose";


export interface ICompanyDatabase extends Document {
  dbURI: string;
  name: string;
  dateCreated: Date;
  password: string;
}

const companyDatabaseSchema = new Schema<ICompanyDatabase>({
  dbURI: { type: String, required: true },
  name: { type: String, required: true },
  dateCreated: { type: Date, required: true, default: Date.now },
  password: { type: String, required: true },
});

const CompanyDatabase = mongoose.model<ICompanyDatabase>(
  "CompanyDatabase",
  companyDatabaseSchema
);

export default CompanyDatabase;
