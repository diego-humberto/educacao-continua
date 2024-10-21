import * as jwt from "jsonwebtoken";
import { AuthenticationData } from "../User";
import dotenv from 'dotenv';

dotenv.config();

export class Authenticator{
    generateToken(info: AuthenticationData): string{
        const token = jwt.sign(
            {id: info.id},
            process.env.JWT_SECRET || "defaultSecret",
            {expiresIn: "24h" }
        )
        return token;
    }

    getTokenData(token: string): AuthenticationData {
        const payload = jwt.verify(
            token,
             process.env.JWT_SECRET || "defaultSecret"
        );
        return payload as AuthenticationData
    }
    
}