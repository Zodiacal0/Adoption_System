import {body , check} from "express-validator";
import { uidPetExist } from "../helpers/pet-validator.js";
import { validationsFields } from "./validatorFiels.js";
import { deleteFileOnError } from "./delete-file-error.js";

export const registerPetValidator = [
    body("name").not().isEmpty().withMessage("Name is required"),
    body("approximateAge").not().isEmpty().withMessage("Approximate Age is required"),
    body("sex").not().isEmpty().withMessage("Sex is required"),
    body("wounds").not().isEmpty().withMessage("Wounds field is required"),
    body("status").not().isEmpty().withMessage("Status is required"),
    body("owner").optional().isMongoId().withMessage("Owner must be a valid MongoDB ObjectId"),
    validationsFields, 
    deleteFileOnError
];

export const deletePetValidator =[
    check("uid").isMongoId().withMessage("This ID isn't valid"),
    check("uid").custom(uidPetExist),
    validationsFields,
    deleteFileOnError
];

