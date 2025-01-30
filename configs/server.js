'use strict';

import helmet from "helmet";
import cors from "cors";
import morgan from "morgan";
import express from "express";  

const configs = (app) => {
    app.use(helmet());
    app.use(cors());
    app.use(morgan('dev'));
};

export const initServer = () => {
    const app = express();
    try{
        configs(app);
        const timeInit = Date.now().toString().slice(10);
        app.listen(process.env.PORT);
        console.log(`Server running on port ${process.env.PORT} ${timeInit}ms`);
    }catch(err){
        console.log(`Server failed to start: ${err}`);
    }
};