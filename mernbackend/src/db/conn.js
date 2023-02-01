const mongoose = require('mongoose');
mongoose.set('strictQuery', false);


mongoose.connect("mongodb://127.0.0.1:27017/registration_form").then(() => {
    console.log('connection successful')
}).catch((err) => {
    console.log(err);
});



// mongodb+srv://amansh:<password>@cluster0.9ej9lan.mongodb.net/?retryWrites=true&w=majority