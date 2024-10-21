import { Request, Response } from "express";
import connetion from "../data/connetion";
import { Authenticator } from "../Services/Authenticator";
import * as bcrypt from "bcryptjs";

export async function LoginUser(
    req: Request,
    res: Response
):Promise<void> { 
     try{
   const {email, password} = req.body;

   if(!email || !password){
    throw new Error("por favor, preencha os campos corretamente")
    }

   const[ User ] = await connetion('users')
   .where({email})

   if(!User){
    res.statusCode = 400
     throw new Error('Usuario não existente')
   }

   const isPasswordValid = await bcrypt.compare(password, User.password);
        if (!isPasswordValid) {
            res.status(401).json({ message: 'Senha inválida' });
            return;
        }

   const auth = new Authenticator();
   const token = auth.generateToken({id: User.id});
    
   res.status(200).json({token})

    }catch(error:any){
     res.json({message: error.message});
    }
}