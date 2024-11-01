import { Request,Response } from "express";
import connection from "../data/connetion";

export default async function TemasInsert(
    req: Request,
    res:Response
):Promise<void> {
    try{
    const {titulo,descricão,Data_criacao}=req.body

    if(!titulo || !descricão || !Data_criacao){
        res.statusCode= 422
        throw new Error("preencha os campos a seguir")
    }

    const [TemaExist] =  await connection('temas')
    .where({titulo})

    if(TemaExist){
        res.statusCode=409
        throw new Error("titulo já registrado");
     }


    const idTemasQuiz = await connection('temas')
    .insert({
    titulo: titulo,
    descricão: descricão,
    Data_criacao: Data_criacao
    });

res.status(201).json({idTemasQuiz})
    }catch(error:any){
   res.status(500).json({ message: error.message })
    }
}