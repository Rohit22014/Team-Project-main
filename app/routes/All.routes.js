module.exports = (app) => {
    const Controller = require('../controllers/All.controllers.js');
    //This route is for the root location
    app.get('/', Controller.root);
    //These Roots are the basic CRUD operation Create,Retrieve,Update and Delete
    app.post('/', Controller.Registration);
    app.get('/', Controller.findAllCustomer);
    app.put('/Settings', Controller.updateCustomer);
    app.delete('/Settings/:_id', Controller.deleteCustomer);
    app.get('/Reset', Controller.reset);
    // app.post('/Therapists', Controller.createTherapist);
    // app.get('/Therapists', Controller.findAllTherapist);
    // app.put('/Therapists/:_id', Controller.updateTherapist);
    // app.delete('/Therapists/:_id', Controller.deleteTherapist);
    // app.post('/Sessions', Controller.createSession);
    // app.get('/Sessions', Controller.findAllSession);
    // app.put('/Sessions/:_id', Controller.updateSession);
    // app.delete('/Sessions/:_id', Controller.deleteSession);
    
    //These routes are for the database search functionality
    app.get('/Products/ProductName/:s', Controller.searchProducts); 
    app.get('/Products/ProductName/:s/fullView/:_id', Controller.searchProductsByName); 
}