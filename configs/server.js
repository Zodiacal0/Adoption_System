'use strict';

import helmet from "helmet";
import cors from "cors";
import morgan from "morgan";
import express from "express";  

const configs = (app) => {
    app.use(helmet());
    app.use(cors());
    app.use(morgan("dev"));
};

export const initServer = () => {
    const app = express();
    const timeInit = Date.now();
    try{
        configs(app);
        app.listen(process.env.PORT);
        const elapsedTime = Date.now() - timeInit;
        console.log(`Server running on port ${process.env.PORT} ${elapsedTime}ms`);
    }catch(error){
        console.log(`Server failed to start: ${error}`);
    }
};