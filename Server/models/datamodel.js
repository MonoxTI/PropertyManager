import mongoose, { Schema } from "mongoose";


const propSchema = new mongoose.Schema({
  PropertyName: {type: String, required: true},
  location: {type: String, required: true},
  Month: {type: String},
  Rent: {type: Number, default: 0},
  Levy: {type: Number, default: 0},
  Bond: {type: Number, default: 0},
  Tenant: {type: Boolean, required: true}
});

const monthlySchema = new mongoose.Schema({
  Prop: {type: mongoose.Schema.Types.ObjectId, ref: 'Property'},
  Month: {type: String},
  Rent: {type: Number, default: 0},
  Levy: {type: Number, default: 0},
  Bond: {type: Number, default: 0},
  Expense : [{
        Description: String,
        Amount: Number
      }]
})
// for future use (not currently used)
const TotalSchema = new mongoose.Schema({
  TotalRent: {type: Number, default : 0},
  TotalLevy:{type: Number, default : 0},
  TotalBond:{type: Number, default : 0},
  TotalExpense: {type: Number, default: 0},
  month: {type: mongoose.Schema.Types.ObjectId, ref: 'Month'}
})

export const TotalDB = mongoose.models.total || mongoose.model('Total',TotalSchema);
export const PropDB = mongoose.models.prop || mongoose.model('Property',propSchema);
export const MonthDB = mongoose.models.month || mongoose.model('Month',monthlySchema);

export default {PropDB,MonthDB,TotalDB};
