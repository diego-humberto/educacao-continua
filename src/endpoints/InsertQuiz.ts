import { Request, Response } from "express";
import connection from "../data/connetion";
import { TQuiz, User } from "../User";



export default async function InsertQuiz(
    req:Request,
    res:Response
):Promise<void> {
    try{
    const {perguntas, A_alter, B_alter, C_alter, D_alter,resposta, id_Temas}= req.body

    if(!perguntas || !A_alter|| !B_alter|| !C_alter || !D_alter || !resposta || typeof id_Temas !== 'number'){
        res.statusCode = 422 
        throw new Error("preencha os campos 'perguntas' , 'alternativa A','alternativa b' ,'alternativa c','alternativa d',' respostas' e 'id_Temas ")
    }

    const [QuizExist] =  await connection('quiz')
    .where({perguntas})

    if(QuizExist){
        res.statusCode=409
        throw new Error("Pergunta já registrado");
     }


   const idQuizInserido : TQuiz = {perguntas,A_alter, B_alter,C_alter, D_alter,resposta,id_Temas} 
   await connection('Quiz')
   .insert({
    perguntas:idQuizInserido.perguntas,
    A_alter: idQuizInserido.A_alter,
    B_alter: idQuizInserido.B_alter,
    C_alter: idQuizInserido.C_alter,
    D_alter: idQuizInserido.D_alter,
    resposta: idQuizInserido.resposta,
    id_Temas: idQuizInserido.id_Temas
   });
  

   res.status(201).json({idQuizInserido})

    }catch(error:any){
    res.status(500).json({ message: error.message })
    }
}