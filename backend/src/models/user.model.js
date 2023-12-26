import mongoose from 'mongoose';



const userSchema = new mongoose.Schema({
    username:{
        type: String,
        required: true,
        trim: true
    },
    email:{
        type: String,
        required: true,
        trim: true,
        unique: true
    },
    password:{
        type: String,
        required: true,
        
    },
    description:{
        type: String,
        required: true,
    },
    phone:{
        type: String,
        required: true,
    },
    photo:{
        public_id: String,
        secure_url: String,
    },
    direction:{
        type: String,
        required: true,
    },
    cv:{
        public_id: String,
        secure_url: String,
    },
    specialization:{
        type: Array,
        required: true,
    },
    feedback:{
        type: Array,
    },
},{
    timestamps: true,
})

const User = mongoose.model('User',userSchema);

export default User;

