const mongoose = require("mongoose");
const {Schema} = mongoose;
const userSchema = new Schema({
        name: {type: String, required: true},
        email:
            {
                type: String,
                required: [true, 'Please enter a valid email address.'],
                unique: true,
                validate: {
                    validator: function (value) {
                        return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value)
                    },
                    message: 'Invalid email address',
                }
            },
        password: {type: String, required: true},
        phone:
            {
                type: String,
                required: [true, 'Phone number is required'],
                validate: {
                    validator: function (value) {
                        // Bangladesh mobile number validation regex
                        return /^\+8801[0-9]{9}$/.test(value);
                    },
                    message: 'Invalid  phone number',
                },
            },
        address: {type: String, required: true},
        age: {
            type: Number,
            min: 1,
            max: 100,
            required: [true, 'User age required'],
            validate: {
                validator: function (value) {
                    return value >= 18 && value <= 100;
                },
                message: props => `${props.value} is not a valid age!`
            },

        }


    },
    {
        timestamps: true, versionKey: false
    }
);

const User = mongoose.model("User", userSchema);

module.exports = User;
