const express = require('express');         
const bodyParser = require('body-parser');  
const app = express();                     
const hbs = require('hbs');                
const path = require('path');               

app.use(bodyParser.json())                         
app.use(bodyParser.urlencoded({ extended: true }))  

app.set('views',path.join(__dirname,'views'));             
app.set('view engine', 'hbs');                            
app.use('/assets',express.static(__dirname + '/public'));   


const dbConnect = require('./config/connect.js');
const mongoose = require('mongoose');


mongoose.connect(dbConnect.database.url, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useFindAndModify: false
}).then(() => {
    console.log("Successfully connected to the MongoDB database");    
}).catch(err => {
    console.log('Unable to connect to the MongoDB database', err);
    process.exit();
});

require('./app/routes/All.routes.js')(app);


app.listen(3000, () => {
    console.log("Server listening on port 3000");
});

/*Brief Description on the database design and modeling: There are three collections 
in the database Project, Customer,Transactions,and Products. For the products collection the 
transactions collections, We took an embedded data modelling approach, this was suitable for both the customer 
as each of them would have an unique address and for the transaction because there are multiple transactions and no two the same. 
So within each document in the collections they both have the standard data for a customer(Username, password(encrypted),Title,First Name(S), surname,home phone, and email ) 
as fields but also have an AddressHome and AddressBilling object embedded in the document containing their address(Address Line 1, Address Line 2, Town, City/county, Eircode).
The customer collection also has an optional embedded object cardPaymentInfo which holds the customer payment details(CardNumber, CardHolder, SecurityCode, PaymentType and ExpiryDate).
This is the home and billing address. In the products collection the data is (ProductName, ProductCaategory, ProductDesription, ProdutSize, ProductImage and stock) respectively.
The Transactions collection holds the data in three embedded objects ItemsBought, ItemsSold and ItemsSelling which are themselves embedded with i amount of items and a data field userName.
Each containing data fields (ProductName, ProductPrice,Date) with ItemsBought having TrackingNumber aswell.
Each Collection will have 5 documents of sample data each.

Browser Description: This solution works in both firefox and chrome, Windows(OS), Browser Version(Chrome):81.0.4044.138*/