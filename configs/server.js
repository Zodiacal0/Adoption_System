'use strict';

import helmet from "helmet";
import cors from "cors";
import morgan from "morgan";
import express from "express";  
import { connectionDB } from "./mongo.js";
import { set } from "mongoose";
import mongoose from "mongoose";


const configs = (app) => {
    app.use(helmet());
    app.use(cors());
    app.use(morgan("dev"));
};

const connectionMongo = async() =>{
    try{
        await connectionDB();
    }catch(error){
        console.log(`Data Base connection is failed, please try again ${e}`);
    }
};

const checkStatusDatabase = () => {
    setInterval(async () => {
        if (mongoose.connection.readyState !== 1) {
            console.warn("Database disconnected. Attempting to reconnect...");
            await connectionMongo();
        }
    }, 5000);
};

export const initServer = () => {
    const app = express();
    const timeInit = Date.now();
    try{
        configs(app);
        connectionMongo();
        checkStatusDatabase();
        app.listen(process.env.PORT);
        const elapsedTime = Date.now() - timeInit;
        console.log(`Server running on port ${process.env.PORT} ${elapsedTime}ms`);
    }catch(error){
        console.log(`Server failed to start: ${error}`);
    }
};