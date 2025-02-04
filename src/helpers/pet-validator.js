import Pet from "../pet/pet.model.js";

export const uidPetExist = async(uid = "") =>{
    const exist = await Pet.findById(uid);
    if(!exist){
        throw new Error("This ID doesn't exist");
    }
}
