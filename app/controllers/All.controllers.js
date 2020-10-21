const Customer = require('../models/customer.model.js');
const Product = require('../models/product.model.js');
//const Transaction = require('../models/transaction.model.js');

//When the app is in the root location retrieve all results from the database, these are used to render the view
exports.root = (req, res) => {
    res.render('home_view')
};

exports.reset = (req, res) => {
    res.render('reset_view')
};
//This function is to search the database for a specified Item
exports.searchProducts = (req, res) => {
    var search = req.params.s;
    console.log("Searching For Products: "+search)
    Product.find({ ProductName: new RegExp(search,"ig")})
    .then(Products => {
        res.render('product_view',{
            results: Products
          });
    }).catch(err => {
        res.status(500).send({
            message: err.message || "An error occurred while retrieving all Products."
        });
    });
};

//This function is to search the database for a specified Item
exports.searchProductsByName = (req, res) => {
    var Name = req.params._id;
    Product.find({ ProductName: Name})
    .then(Products => {
        res.render('fullProduct_view',{
            results: Products
          });
    }).catch(err => {
        res.status(500).send({
            message: err.message || "An error occurred while retrieving all Products."
        });
    });
};


//This function is for creating a new customer
exports.Registration = (req, res) => {
    // request can't be empty for required fields
    if(!req.body.Title || !req.body.FirstNames|| !req.body.Surname || !req.body.Mobile|| !req.body.Email || !req.body.AddressLine1 || !req.body.Town|| !req.body.countyORcity || !req.body.EIRCODE) {
        return res.status(400).send({
            message: "Customer content cannot be empty!"
        });
    }

    const customer = new Customer({
        Username: req.body.Username,
        Password: req.body.Password,
        Title: req.body.Title,
        FirstNames: req.body.FirstNames,
        Surname: req.body.Surname,
        MobilePhone: req.body.MobilePhone,
        HomePhone: req.body.HomePhone,
        Email: req.body.Email,
        "AddressHome.AddressLine1": req.body.AddressLine1,
        "AddressHome.AddressLine2": req.body.AddressLine2,
        "AddressHome.Town": req.body.Town,
        "AddressHome.countyORcity": req.body.countyORcity,
        "AddressHome.EIRCODE": req.body.EIRCODE,
        "AddressBilling.AddressLine1":req.body.AddressLine1,
        "AddressBilling.AddressLine2":req.body.AddressLine2,
        "AddressBilling.Town":req.body.Town,
        "AddressBilling.countyORcity":req.body.countyORcity,
        "AddressBilling.EIRCODE":req.body.EIRCODE,
        "cachedPaymentInfo.CardNumber":req.body.CardNumber,
        "cachedPaymentInfo.CardHolder":req.body.CardHolder,
        "cachedPaymentInfo.PaymentType":req.body.PaymentType,
        "cachedPaymentInfo.SecurityCode":req.body.SecurityCode,
        "cachedPaymentInfo.ExpiryDate":req.body.ExpiryDate
    });

    //save it to the database
    customer.save()
    .then(data => {
        res.send(data);
    }).catch(err => {
        res.status(500).send({
            message: err.message || "An error occurred while creating the Customer."
        });
    });
};


exports.findAllCustomer = (req, res) => {
    Customer.find()
    .then(Customers => {
        res.render('client_view',{
            results: Customers
          });
    }).catch(err => {
        res.status(500).send({
            message: err.message || "An error occurred while retrieving all Customers."
        });
    });
};

exports.updateCustomer = (req, res) => {
    if(!req.body) {
        return res.status(400).send({
            message: "Customer content cannot be empty"
        });
    }


    Customer.findByIdAndUpdate(req.params.Username, {
         Username: req.body.Username,
        Password: req.body.Password,
        Title: req.body.Title,
        FirstNames: req.body.FirstNames,
        Surname: req.body.Surname,
        MobilePhone: req.body.MobilePhone,
        HomePhone: req.body.HomePhone,
        Email: req.body.Email,
        "AddressHome.AddressLine1": req.body.AddressLine1,
        "AddressHome.AddressLine2": req.body.AddressLine2,
        "AddressHome.Town": req.body.Town,
        "AddressHome.countyORcity": req.body.countyORcity,
        "AddressHome.EIRCODE": req.body.EIRCODE,
        "AddressBilling.AddressLine1":req.body.AddressLine1,
        "AddressBilling.AddressLine2":req.body.AddressLine2,
        "AddressBilling.Town":req.body.Town,
        "AddressBilling.countyORcity":req.body.countyORcity,
        "AddressBilling.EIRCODE":req.body.EIRCODE,
        "cachedPaymentInfo.CardNumber":req.body.CardNumber,
        "cachedPaymentInfo.CardHolder":req.body.CardHolder,
        "cachedPaymentInfo.PaymentType":req.body.PaymentType,
        "cachedPaymentInfo.SecurityCode":req.body.SecurityCode,
        "cachedPaymentInfo.ExpiryDate":req.body.ExpiryDate
    }, 
       { new: true })  
    .then(customer => {
        if(!customer) {
            return res.status(404).send({
                message: "Customeromer not found with Username " + req.params.Username
            });
        }
        res.send(customer);
    }).catch(err => {
        if(err.kind === 'ObjectId') {
            return res.status(404).send({
                message: "Customer not found with Username" + req.params.Username
            });               
        }
        return res.status(500).send({
            message: "Error updating Customer with Username " + req.params.Username
        });
    });
};


exports.deleteCustomer = (req, res) => {
    Customer.findByIdAndRemove(req.params.Username)
    .then(customer => {
        if(!customer) 
        {
            return res.status(404).send({
                message: "Customer not found with Username " + req.params.Username
            });
        }
        res.send({message: "Customer deleted successfully!"});
    }).catch(err => {
        if(err.kind === 'ObjectId' || err.name === 'NotFound') {
            return res.status(404).send({
                message: "Customer not found with Username " + req.params.Username
            });                
        }
        return res.status(500).send({
            message: "Could not delete Customer with Username " + req.params.Username
        });
    });
};


//This function creates a new Therapist based on the create request body
exports.createProduct = (req, res) => {
    // Create if the required fields are not empty
    if(!req.body.ProductName || !req.body.ProductCategory|| !req.body.ProductPrice || !req.body.ProductSize || !req.body.ProductDescription|| !req.body.Stock ) {
        return res.status(400).send({
            message: "Product content cannot be empty!"
        });
    }

    const product = new Product({     
        ProductName: req.body.ProductName,
        ProductCategory: req.body.ProductCategory,
        ProductPrice:req.body.ProductPrice,
        ProductSize:req.body.ProductSize,
        ProductDescription:req.body.ProductDescription,
        ProductImage:req.body.ProductImage,
        Stock:req.body.Stock
    });

    //save it to the database
    product.save()
    .then(data => {
        res.send(data);
    }).catch(err => {
        res.status(500).send({
            message: err.message || "An error occurred while creating the Product."
        });
    });
};

//This function finds all Therapist in the collection 
exports.findAllTherapist = (req, res) => {
    Product.find()
    .then(Products => {
        res.render('therapist_view',{
            results: Products
          });
    }).catch(err => {
        res.status(500).send({
            message: err.message || "An error occurred while retrieving all Products."
        });
    });
};

//This function updates a specific Therapist based on the update request id
exports.updateProduct = (req, res) => {
    if(!req.body) {
        return res.status(400).send({
            message: "Product content cannot be empty"
        });
    }

    //Take information from the request body
    Product.findByIdAndUpdate(req.params.ProductName, {
        ProductName: req.body.ProductName,
        ProductCategory: req.body.ProductCategory,
        ProductPrice:req.body.ProductPrice,
        ProductSize:req.body.ProductSize,
        ProductDescription:req.body.ProductDescription,
        ProductImage:req.body.ProductImage,
        Stock:req.body.Stock
    }, 
       { new: true })  
    .then(product => {
        if(!product) {
            return res.status(404).send({
                message: "Therapist not found with ProductName " + req.params._ProductName
            });
        }
        res.send(product);
    }).catch(err => {
        if(err.kind === 'ObjectId') {
            return res.status(404).send({
                message: "Product not found with ProductName " + req.params.ProductName
            });               
        }
        return res.status(500).send({
            message: "Error updating Therapist with ProductName" + req.params.ProductName
        });
    });
};


//This function Deletes a Specific Therapist per the delete request id
exports.deleteProduct = (req, res) => {
    Therapist.findByIdAndRemove(req.params._id)
    .then(therapist => {
        if(!therapist) 
        {
            return res.status(404).send({
                message: "Therapist not found with id " + req.params._id
            });
        }
        res.send({message: "Therapist deleted successfully!"});
    }).catch(err => {
        if(err.kind === 'ObjectId' || err.name === 'NotFound') {
            return res.status(404).send({
                message: "Therapist not found with id " + req.params._id
            });                
        }
        return res.status(500).send({
            message: "Could not delete Therapist with id " + req.params._id
        });
    });
};

//This function creates a new session per the request
exports.createSession = (req, res) => {
    //Only create if the required fields are filled for the request
    if(!req.body.SessionDate || !req.body.SessionTime|| !req.body.Clients || !req.body.Therapist || !req.body.Fee|| !req.body.SessionNumber|| !req.body.SessionDuration || !req.body.SessionType || !req.body.IssueFlag|| !req.body.SessionNotes) {
        return res.status(400).send({
            message: "Session content cannot be empty!"
        });
    }

 
    //Construct a new session and retrieve information from the request
    const session = new Session({
        SessionDate: req.body.SessionDate,
        SessionTime: req.body.SessionTime,
        Clients: req.body.Clients,
        Therapist: req.body.Therapist,
        Fee: req.body.Fee,
        SessionNumber: req.body.SessionNumber,
        SessionDuration: req.body.SessionDuration,
        SessionType: req.body.SessionType,
        IssueFlag: req.body.IssueFlag,
        SessionNotes: req.body.SessionNotes
    });

    //save it to the database
    session.save()
    .then(data => {
        res.send(data);
    }).catch(err => {
        res.status(500).send({
            message: err.message || "An error occurred while creating the Session."
        });
    });
};


//This function finds all Sessions in the collection
exports.findAllSession = (req, res) => {
    Session.find()
    .then(Sessions => {
        res.render('session_view',{
            results: Sessions
          });
    }).catch(err => {
        res.status(500).send({
            message: err.message || "An error occurred while retrieving all Sessions."
        });
    });
};

//This function updates a specified session based on the request id 
exports.updateSession = (req, res) => {
    if(!req.body) {
        return res.status(400).send({
            message: "Session content cannot be empty"
        });
    }

    //update by retrieving the new information from the update request
    Session.findByIdAndUpdate(req.params._id, {
        SessionDate: req.body.SessionDate,
        SessionTime: req.body.SessionTime,
        Clients: req.body.Clients,
        Therapist: req.body.Therapist,
        Fee: req.body.Fee,
        SessionNumber: req.body.SessionNumber,
        SessionDuration: req.body.SessionDuration,
        SessionType: req.body.SessionType,
        IssueFlag: req.body.IssueFlag,
        SessionNotes: req.body.SessionNotes
    }, 
       { new: true })  
    .then(session => {
        if(!session) {
            return res.status(404).send({
                message: "Session not found with id " + req.params._id
            });
        }
        res.send(session);
    }).catch(err => {
        if(err.kind === 'ObjectId') {
            return res.status(404).send({
                message: "Session not found with id " + req.params._id
            });               
        }
        return res.status(500).send({
            message: "Error updating Session with id " + req.params._id
        });
    });
};

//This function deletes a session by a specified id
exports.deleteSession = (req, res) => {
    Session.findByIdAndRemove(req.params._id)
    .then(session => {
        if(!session) 
        {
            return res.status(404).send({
                message: "Session not found with id " + req.params._id
            });
        }
        res.send({message: "Session deleted successfully!"});
    }).catch(err => {
        if(err.kind === 'ObjectId' || err.name === 'NotFound') {
            return res.status(404).send({
                message: "Session not found with id " + req.params._id
            });                
        }
        return res.status(500).send({
            message: "Could not delete Session with id " + req.params._id
        });
    });
};