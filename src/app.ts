import express from "express";
import { router } from "./router";

import cors from "cors";

export class App {
  public server: express.Application;

  constructor() {
    this.server = express();
    this.enableCors();
    this.middlewares();
    this.router();
  }
  private enableCors() {
    const corsOptions: cors.CorsOptions = {
      origin: process.env.ORIGIN,
      methods: process.env.METHODS,
      allowedHeaders:
        process.env.ALLOWED_HEADERS
    };
    this.server.use(cors(corsOptions));
  }
  private middlewares() {
    this.server.use(express.json());
    this.enableCors();
  }

  private router() {
    this.server.use(router);
  }
}
