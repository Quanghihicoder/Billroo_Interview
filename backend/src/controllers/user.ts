import { Request, Response } from "express";
import { getDaysSinceJoin } from "../models/UserModel";

export async function getDays(req: Request, res: Response) {
    const user_id : string = req.params.user_id;

    try {
        await getDaysSinceJoin(user_id, res);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Failed to fetch data' });
    }
} 