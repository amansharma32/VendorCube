const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");
const employeeSchema = new mongoose.Schema({
  firstname: {
    type: String,
    required: true,
  },

  lastname: {
    type: String,
    required: true,
  },

  email: {
    type: String,
    required: true,
    unique: true,
  },

  phonenumber: {
    type: Number,
    required: true,
  },

  category: {
    type: String,
    required: true,
  },

  Password: {
    type: String,
    required: true,
  },

  ConfirmPassword: {
    type: String,
    required: true,
  },
});

employeeSchema.pre("save", async function(next) {
 
    if(this.isModified("password")) {
        // const passwordHash = await bcrypt.hash(password,10);
        // console.log(`the current password is ${this.Password}`);
       
        this.Password = await bcrypt.hash(this.Password,10);
        console.log(`the current password is ${this.Password}`);
        
    } 

  next();

  
});


const Register = new mongoose.model("Register", employeeSchema);

module.exports = Register;
