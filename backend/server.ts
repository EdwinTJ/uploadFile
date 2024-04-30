import express from "express"
import cors from "cors"

const app = express()
const port = process.env.PORT ?? 3000;

app.use(cors()) // Enable cors

app.listen(port, () =>{
    console.log(`Server Running at port:${port}`)
})