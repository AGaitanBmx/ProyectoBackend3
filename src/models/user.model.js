const { Schema, model, Types } = require('mongoose');


const UserSchema = new Schema(
{
first_name: { type: String, required: true },
last_name: { type: String, required: true },
email: { type: String, required: true, unique: true, index: true },
password: { type: String, required: true },
role: { type: String, enum: ['user', 'admin'], default: 'user' },
pets: [{ type: Types.ObjectId, ref: 'Pet' }]
},
{ timestamps: true }
);


module.exports = model('User', UserSchema);