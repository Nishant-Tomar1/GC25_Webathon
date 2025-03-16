import mongoose, {Schema} from 'mongoose'
import jwt from "jsonwebtoken";  
import bcrypt from 'bcrypt';

const userSchema = new Schema({
    email: {
        type: String,
        required: true,
        unique: true,
        trim: true,
    },
    fullName : {
        type : String,
        required : true,
        trim : true,
        index : true
    },
    password: {
        type: String,
        required: true,
    },
    profilePicture: {
        type: String, //cloudinary
        default: '',
    },
    contactNumber: {
        type: String,
        default: '',
    },
    role : {
        type : String,
        enum : ["buyer","seller"],
        required : [true,"role cannot be empty"]
    },
    address : [{
        type : String,
    }],
    Token : {
        type : String,
    }
},{timestamps:true});

//password encryption
userSchema.pre("save", async function (next) {
    
    if (!this.isModified("password")) return next();

    this.password = await bcrypt.hash(this.password, 10)
    next();    
});

//checkpasswordforcorrect by defining custom methods
userSchema.methods.isPasswordCorrect = async function(password) {
    return await bcrypt.compare(password, this.password)
}

//generating token
userSchema.methods.generateToken = function(){
    return jwt.sign(
        {
            _id : this._id,  //more payload in case of accesstoken
            email : this.email, 
            username : this.username,
            fullName : this.fullName
        },
        process.env.TOKEN_SECRET,
        {
            expiresIn : process.env.TOKEN_EXPIRY
        }
    )
};

export const User = mongoose.model('User', userSchema);
