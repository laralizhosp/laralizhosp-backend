import { Request, Response } from 'express';
import { v4 as uuid } from "uuid";

import db from '../../db';

const collectionName = 'users';
let nextId = 2;

class UserController {
    public async list(req: Request, res: Response) {
        let result = await db.list(collectionName);
        return res.json(result);
    }

    public async get(req: Request, res: Response) {
        const { id } = req.params;

        let result = await db.get(collectionName, Number.parseInt(id));
        if (!result)
            return res.status(404).json({ error: 'User not found' }); 
        return res.json(result);
    }

    public async create(req: Request, res: Response) {
        const { name, email, password } = req.body;

        const emailExists = await db.search(collectionName, { email: String(email) });

        if (emailExists) {
            return res.json({
                message: "E-mail já cadastrado!",
                status: 409
            })
        }

        let result = await db.insert(collectionName, {
            id: nextId,
            token: uuid(),
            name,
            email,
            password
        });
        nextId += 1;
        return res.json(result.insertedId);
    }

    public async search(req: Request, res: Response) {
        const { email } = req.body;
        let result = await db.search(collectionName, {email: String(email)});

        if (!result)
            return res.status(404).json({ error: 'User not found' });

        return res.json(result);
    }
}

export const userController = new UserController();