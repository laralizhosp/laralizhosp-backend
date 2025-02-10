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
      origin: "*",
      methods: "GET, POST, PUT, DELETE, OPTIONS",
      allowedHeaders:
        "Content-Type, Authorization",
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
