import { Request, Response } from 'express';

export async function register(_req: Request, res: Response) {
  return res.status(200).json('henlo');
}
