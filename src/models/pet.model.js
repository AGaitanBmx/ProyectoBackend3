const { Schema, model, Types } = require('mongoose');


const PetSchema = new Schema(
{
name: { type: String, required: true },
species: { type: String, required: true },
birthDate: { type: Date },
adopted: { type: Boolean, default: false },
owner: { type: Types.ObjectId, ref: 'User' }
},
{ timestamps: true }
);


module.exports = model('Pet', PetSchema);