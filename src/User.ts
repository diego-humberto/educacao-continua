export type User = {
    id: string
    email: string
    password: string
    name: string
    nickname: string
}

export type TQuiz = {
    perguntas: string,
    A_alter: string,
    B_alter: string,
    C_alter: string,
    D_alter: string,
    resposta: string,
    id_Temas: number
    }

export interface AuthenticationData {
    id: string
 }