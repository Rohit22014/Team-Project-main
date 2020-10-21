const mongoose = require('mongoose');

//Create the model schema based on the document structure
const TransactionsSchema = mongoose.Schema({
    custUsername: String,
    "AddressHome.AddressLine1":String,
    "AddressHome.AddressLine2":String,
    "AddressHome.Town":String,
    "AddressHome.countyORcity":String,
    "AddressHome.EIRCODE":String
    
});

module.exports = mongoose.model('Transaction', TransactionsSchema);
