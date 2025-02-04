import Pet from "../pet/pet.model.js";


export const registerPet = async(req, res) =>{
    try{
        const data = req.body;
        
        let profilePicture = req.file ? req.file.filename : null;
        data.profilePicture = profilePicture;
        const pet = await Pet.create(data);

        return res.status(201).json({
            message: "Pet registration Succeful",
            name: pet.name,
            owner: pet.owner.name
        });

    }catch(err){
        return res.status(500).json({
            message: "Pet registration failed",
            error: err.message 
        });
    }
}

export const deletePet = async(req,res) =>{
    try{

        const {uid} = req.params
        const pet = await Pet.findByIdAndUpdate(uid, {status: "ADPOTED"}, {new: true})
        
        return res.status(200).json({
            succes: true,
            message: "Pet deleted",
            pet
        })

    }catch(err){
        return res.status(500).json({
            message: "Error to delete the Pet",
            error: err.message 
        });
    }
}

