const mongoose = require("mongoose");

const userSchema = mongoose.Schema(
    {
        name: {
            type: String,
            required: [true, "The User Name Is Required"],
            maxlength: [100, "The Name must be less than 100 characters"],
            minlength: [3, "The Name must be more than 3 characters"],
            trim: true
        },
        slug: {
            type: String,
            lowercase: true
        },
        email: {
            type: String,
            required: [true, "The Email Is Required"],
            trim: true,
            unique: [true, "The Email Must be Unique"],
            validate: {
                validator: (val) => /^\w+([\\.-]?\w+)*@\w+([\\.-]?\w+)*(\.\w{2,3})+$/.test(val),
                message: `{VALUE} Is Not Valid Email`
            }
        },
        password: {
            type: String,
            required: [true, "The Password Is Required"],
            minlength: [8, "The Pssword must be more than 6 characters"],
            validate: {
                validator: (val) => /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[^a-zA-Z0-9])(?!.*\s).{8,15}$/.test(val),
                message: `{VALUE} Is Not Valid Password it must be contain at least one lowercase letter,
                    one uppercase letter, one numeric digit, and one special character`
            }
        },
        active: {
            type: Boolean,
            default: true
        },
        phone: String,
        imgProfile: String,
        role: {
            type: String,
            enum: ["user", "admin"],
            default: "user"
        }
    },
    { timestamp: true }
);

const User = mongoose.model("User", userSchema);

module.exports = User;