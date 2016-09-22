var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var datoSchema = new Schema({
   nombre:String,
   idioma:String,
   texto:String
});
module.exports = mongoose.model('dato', datoSchema);      