import express from "express"
import cors from "cors"

const app = express()
const port = process.env.PORT ?? 3000;

app.use(cors()) // Enable cors

app.post("/api/files", async( req,res)=>{
    // TODO:
    // 1. Extract Values from request
    // 2. Validate is not null or empty
    // 3. Validete type file
    // 4. Convert file to a string
    // 5. transform string to csv
    // 6. Save JSON data
    // 7. Retrun 200 with a message and object wiht info.

    return res.status(200).json({message:"The file was successfully uploaded"})

})

// Start Server
app.listen(port, () =>{
    console.log(`Server Running at port:${port}`)
})