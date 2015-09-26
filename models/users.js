/**
 * Created by aleduarte06 on 24/9/15.
 */
var mongoose = require('mongoose'),
    Schema   = mongoose.Schema;

var userSchema = new Schema({
    email: { type: String, index: true, unique: true},
    password: String,
    fullname: String,
    active: Boolean,
    reservations: [Schema.Types.ObjectId],
    apartments:[Schema.Types.ObjectId]
});

module.exports = mongoose.model('User', userSchema);