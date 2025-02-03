import { hash } from "argon2";
import User from "./user.model.js"

export const getUserById = async (req,res) =>{
    try{
        const {uid} = req.params;
        const user = await User.findById(uid);

        if(!user){
            return res.status(404).json({
                succes: false,
                message: "User not found"
            })
        }

        return res.status(200).json({
            succes: true,
            user
        })

    }catch(err){
        return res.status(500).json({
            succes: false,
            message: "Error to obtain the user",
            error: err
        })
    }
}

export const getUsers = async(req, res) =>{
    try{
        const {limite = 5 , desde = 0} = req.query
        const query = {status:true}
        
        const [total, users] = await Promise.all([
            User.countDocuments(),
            User.find(query).skip(Number(desde)).limit(Number(limite)),

        ])

        return res.status(200).json({
            succes: true,
            total,
            users
        })

    }catch(err){
        return res.status(500).json({
            succes: false,
            message: "Error to obtain the users",
            error: err
        })
    }
}

export const deleteUser = async(req, res) =>{
    try{
        
        const {uid} = req.params
        const user = await User.findByIdAndUpdate(uid, {status: false}, {new: true})

        return res.status(200).json({
            succes: true,
            message: "User deleted",
            user
        })

    }catch(err){
        return res.status(500).json({
            succes: false,
            message: "Error to delete the user",
            error: err.message
        })
    }
}

export const updatePassword = async (req, res) => {
    try {
        
        const {uid} = req.params;
        const {newPassword} = req.body;
        
        const encryptedPass = await hash(newPassword);
        await User.findByIdAndUpdate(uid,{password: encryptedPass}, {new:true})

        return res.status(200).json({
            succes: true,
            message: "Password updated"
        })

    } catch (err) {
        return res.status(500).json({
            succes: false,
            message: "Error to change the password",
            error: err.message
        })
    }
}