import express from 'express';
import cors from 'cors';

const app = express();


app.use(express.json())
app.use(cors())

app.get('/',(req,res) =>{
res.json({ message: 'Hello from the server!' });
})


app.listen(3003, () => {
    console.log("Server is running  in http://localhost:3003")
})  

export default app;
