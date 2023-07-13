import mongoose from 'mongoose';
const Schema = mongoose.Schema;
import bcrypt from 'bcrypt';

const UserSchema = new Schema({
    email:{
        type:String,
        require:true,
        lowercase:true,
        unique:true
    },
    password:{
        type:String,
        require:true
    }
})

UserSchema.pre('save', async function (next){
    try {
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(this.password, salt);
        this.password = hashedPassword;
        next();
    } catch (error) {
        
    }
})

UserSchema.methods.isValidPassword = async function(password){
    try {
        return await bcrypt.compare(password, this.password)
    } catch (error) {
        throw(error)
    }
}

const User = mongoose.model('user', UserSchema)

export default User;