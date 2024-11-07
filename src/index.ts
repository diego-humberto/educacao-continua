import app from "./app";
import createUser from "./endpoints/createUser";
import { LoginUser } from "./endpoints/LoginUser";
import InsertQuiz from "./endpoints/InsertQuiz";
import TemasInsert from "./endpoints/TemasInsert";
import GetQuiz from "./endpoints/GetQuiz";

app.post('/user/signup', createUser),
app.post('/user/Login',LoginUser),
app.post('/quiz/perguntas', InsertQuiz),
app.post('/tema/Quiz', TemasInsert),
app.get('/Quiz',GetQuiz)