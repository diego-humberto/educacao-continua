import { Request, Response } from "express";
import connetion from "../data/connetion";

export default async function GetQuiz(
    req: Request,
    res:Response
):Promise<void>{
    try{

        
        const Result= await connetion('quiz')
        .select('*')


        res.status(200).json(Result[0])


    }catch(error: any){
        res.status(500).json({ message: error.message })
    }
}