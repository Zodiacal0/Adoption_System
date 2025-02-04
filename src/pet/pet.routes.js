import { Router } from "express";
import {registerPet , deletePet} from "./pet.controller.js";
import { registerPetValidator , deletePetValidator} from "../middlewares/petValidators.js";
import { uploadProfilePicture } from '../middlewares/multer-uploads.js';
import { deleteFileOnError } from '../middlewares/delete-file-error.js';  



const router = Router();

router.post(
    "/registerPet/",
    uploadProfilePicture.single("profilePicture"),
    registerPetValidator,
    deleteFileOnError,
    registerPet
);

router.delete(
    "/deletePet/:uid",
    deletePetValidator,
    deletePet
)

export default router;