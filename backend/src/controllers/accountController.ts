import { Request, Response } from "express";
import pool from "../config/db";

async function getAccount(req: Request, res: Response) {
    try {
        const rows = await pool.query('SELECT * FROM accounts');
        console.log(rows)
        res.status(200).json(rows);
    } catch (error) {
        res.status(500).json({ error: error });
    }
}

async function createAccount(req: Request, res: Response) {
    try {
        console.log('getAccount')
    } catch (error) {
        res.status(500).json({ error: 'Internal Server Error' });
    }
}

async function updateAccount(req: Request, res: Response) {
    try {
        console.log('getAccount')
    } catch (error) {
        res.status(500).json({ error: 'Internal Server Error' });
    }
}

async function deleteAccount(req: Request, res: Response) {
    try {
        console.log('getAccount')
    } catch (error) {
        res.status(500).json({ error: 'Internal Server Error' });
    }
}

export { getAccount, createAccount, updateAccount, deleteAccount }