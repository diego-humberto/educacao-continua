import app from "./app";
import createUser from "./endpoints/createUser";
import { LoginUser } from "./endpoints/LoginUser";

app.post('/user/signup', createUser),
app.post('/user/Login',LoginUser)