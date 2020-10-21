const mongoose = require('mongoose');

//Create the model schema based on the document structure
const ProductsSchema = mongoose.Schema({
    ProductName: String,
    ProductCategory: String,
    ProductPrice:String,
    ProductSize:String,
    ProductDescription:String,
    img: 
    { 
        data: Buffer, 
        contentType: String 
    } ,
    Stock:String
});

module.exports = mongoose.model('Product', ProductsSchema);
