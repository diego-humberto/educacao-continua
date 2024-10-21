import { Request, Response } from "express";
import connetion from "../data/connetion";
import { User } from "../User";
import * as bcrypt from "bcryptjs";
import { IdGenerator } from "../Services/IdGenerator";
import { Authenticator } from "../Services/Authenticator";

interface IUser{
    name:string;
    nickname:string;
    email:string;
    password:string
}

export default async function createUser(
    req:Request,
    res:Response
    ):Promise<void>{
    try{
     
        const {name, nickname, email, password}:IUser = req.body;

        if (!name || !nickname || !email || !password) {
            res.statusCode = 422
            throw new Error("Preencha os campos 'name','nickname', 'password' e 'email'")
         }

        const [User] = await connetion('users')
        .where({email})

        if(User){
            res.statusCode = 409
            throw new Error ('Email já cadastrado')
        }

        const passwordHash = await bcrypt.hash(password, 10)

        const id: string = new IdGenerator().generateId();


        const newUser:User = {id,name, nickname, email, password: passwordHash, }

        await connetion('users')
        .insert({
            id: newUser.id,
            name: newUser.name,
            nickname: newUser.nickname,
            email: newUser.email,
            password: newUser.password
        });

        const auth = new Authenticator();

        const token = auth.generateToken({ id: newUser.id });
        
        res.status(201).json({token})

        
    }catch(error:any){
        res.json({ message: error.message })
     }
}