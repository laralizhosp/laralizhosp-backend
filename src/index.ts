import { App } from "./app";
import dotenv from 'dotenv';
dotenv.config();

declare global {
    namespace NodeJS {
      interface ProcessEnv {
        PORT: string;
        URL: string;
        ORIGIN: string;
        METHODS: string[];
        ALLOWEDHEADERS: string[];
      }
    }
  }

new App().server.listen(process.env.PORT);