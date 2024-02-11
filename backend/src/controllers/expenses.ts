import { Request, Response } from "express";
import {getAllAverByWeek, getAllTimeSpend, getRecentSpend, getTodaySpend, updateTodayExpenses} from "../models/ExpensesModel";

export async function getRecent(req: Request, res: Response) {
    const user_id : string = req.params.user_id;

    try {
        await getRecentSpend(user_id,res);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Failed to fetch data' });
    }
} 

export async function getAver(req: Request, res: Response) {
    const user_id : string = req.params.user_id;

    try {
        await getAllAverByWeek(user_id,res);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Failed to fetch data' });
    }
} 

export async function getToday(req: Request, res: Response) {
    const user_id : string = req.params.user_id;

    try {
        await getTodaySpend(user_id,res);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Failed to fetch data' });
    }
} 

export async function getAllTime(req: Request, res: Response) {
    const user_id : string = req.params.user_id;

    try {
        await getAllTimeSpend(user_id,res);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Failed to fetch data' });
    }
} 


export async function updateExpenses(req: Request, res: Response) {
    const user_id : number = parseInt(req.body.user_id);
    const expenses: number[] = req.body.expenses

    try {
        await updateTodayExpenses(user_id,expenses);
    } catch (error) {
        console.error(error);
        res.status(400).json({ error: 'Failed to post data' });
    }
} 
