import { Request, Response } from "express";
import db from "../../db";

const collectionName = "assessments";
let nextId = 2;

class AssessmentController {
  public async list(req: Request, res: Response) {
    let result = await db.list(collectionName);
    return res.json(result);
  }

  public async create(req: Request, res: Response) {
    const { assessment, message, name, address, telephone } = req.body;
    let result = await db.insert(collectionName, {
      id: nextId,
      assessment,
      message,
      name,
      address,
      telephone
    });

    nextId += 1;
    return res.json(result.insertedId);
  }
}

export const assessmentController = new AssessmentController();