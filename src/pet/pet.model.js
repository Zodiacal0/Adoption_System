import { Schema, model } from "mongoose";

const petSchema = Schema({
    name:{
        type: String,
        required: [true, "Name is required"],
        maxLength: [30, "Name cannot exceed 30 characters"]
    },
    race:{
        type: String,
        default: "Unknow",
        maxLength: [30, "Race cannot exceed 30 characteres"]
    },
    approximateAge: {
        type: String,
        required: [true, "The Approximation Age is required"],
        maxLength: [2, "Aproximated Age cannot exceed 2 characteres"]
    },
    sex:{
        type: String,
        required: true,
        enum: ["MALE", "FEMALE"]
    },
    wounds:{
        type: String,
        required: true,
        enum: ["NONE", "TRUE"]
    },
    profilePicture:{
        type: String
    },
    status: {
        type: String,
        enum: ["ADOPTED","NO_ADOPTED"],
        default: "NO_ADOPTED"
    },
    owner:{
        type: Schema.Types.ObjectId,
        ref: "User",
        default: null
    }

});

petSchema.methods.toJSON = function(){
    const{_v,status,_id,...pet} = this.toObject();
    pet.uid = _id;
    return pet;
};

export default model("Pet", petSchema);