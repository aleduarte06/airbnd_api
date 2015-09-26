var mongoose = require('mongoose'),
    Schema = mongoose.Schema,
    GeoJSON = require('mongoose-geojson-schema');

var apartmentSchema = new Schema({
    owner: Schema.Types.ObjectId,
    title: String,
    description: String,
    adreess: {
        fullAdress: String,
        cord: GeoJSON.Feature
    },
    pictures: [{url: String}],
    reservations: [Schema.Types.ObjectId]
});

module.exports = mongoose.model('Apartment', apartmentSchema);