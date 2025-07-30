import mongoose from "mongoose";

const propSchema = new mongoose.Schema({
  PropertyName: {type: String, required: true},
  location: {type: String, required: true},
  TotalRent: {type: Number, default : 0},
  TotalLevy:{type: Number, default : 0},
  TotalBond:{type: Number, default : 0},
  Tenant: {type: Boolean, required: true},
  Records : [
   {
      Month: {type: String},
      Rent: {type: Number, default: 0},
      Levy: {type: Number, default: 0},
      Bond: {type: Number, default: 0}
   }
  ]
});

const database = mongoose.models.prop || mongoose.model('proper',propSchema);

export default database;
