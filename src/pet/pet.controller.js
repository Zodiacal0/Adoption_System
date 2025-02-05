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
            success: true,
            message: "Pet deleted",
            pet
        })

    }catch(err){
        return res.status(500).json({
            success: false,
            message: "Error to delete the Pet",
            error: message 
        });
    }
}

export const updatePet = async (req, res) => {
    try {
        const { uid } = req.params;
        const { newApproximateAge, newWounds, newStatus, newOwner } = req.body;

        const updates = {};
        if (newApproximateAge !== undefined) {
            updates.approximateAge = newApproximateAge;
        };
        if (newWounds !== undefined) {
            updates.wounds = newWounds;
        };
        if (newStatus !== undefined) {
            updates.status = newStatus;
        };
        if (newOwner !== undefined) {
            updates.owner = newOwner;
        };

        if (Object.keys(updates).length === 0) {
            return res.status(400).json({
                success: false,
                message: "No data provided for update",
                error: message
            });
        }

        if (updates.owner !== undefined && updates.owner !== null && updates.status === "NOT_ADOPTED") {
            updates.status = "ADOPTED";
        }

        if (updates.status === "ADOPTED" && (updates.owner === null || updates.owner === undefined)) {
            return res.status(400).json({
                success: false,
                message: "Invalid request: A pet with status 'ADOPTED' must have an owner.",
                error: message
            });
        }
        

        const updatedPet = await Pet.findByIdAndUpdate(uid, {
            approximateAge: updates.approximateAge,
            wounds: updates.wounds,
            status: updates.status,
            owner: updates.owner
            }, 
            { new: true }
        );


        if (!updatedPet) {
            return res.status(404).json({
                success: false,
                message: "Pet not found",
                error: message
            });
        }

        return res.status(200).json({
            success: true,
            message: "Information of Pet updated",
            pet: updatedPet,
        });

    } catch (err) {
        return res.status(500).json({
            message: "Error updating the pet",
            error: err.message
        });
    }
};
