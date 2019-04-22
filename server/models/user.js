const mongoose = require("mongoose");
const { Schema } = mongoose;
const { encrypt } = require("../helpers/bcrypt");

const userSchema = new Schema({
    name: {
        type: String,
        required: [true, "User name required"]
    },
    email: {
        type: String,
        unique: true,
        validate: {
            validator: function (email) {
                return /^([a-zA-Z0-9_\-\.]+)@([a-zA-Z0-9_\-\.]+)\.([a-zA-Z]{2,5})$/.test(
                    email
                );
            },
            message: props => `${props.value} is not a valid email!`
        },
        required: [true, "User email required"]
    },
    password: {
        type: String,
        required: [true, "User password required"]
    },
    role: {
        type: String,
        default: 'Customer'
    }
});

userSchema.post("save", function (error, doc, next) {
    if (error.name === "MongoError" && error.code === 11000) {
        next(new Error("Email has been taken"));
    } else {
        next();
    }
});

userSchema.pre("save", function (next) {
    this.password = encrypt(this.password);
    next();
});

const User = mongoose.model("User", userSchema);

module.exports = User;
