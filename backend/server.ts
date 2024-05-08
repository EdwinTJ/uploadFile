import express from "express"
import cors from "cors"
import multer from "multer"
import csvToJson from "convert-csv-to-json"

const app = express()
const port = process.env.PORT ?? 3000

app.use(cors()) // Enable cors

// Set multer save in memory
const storage = multer.memoryStorage()
const upload = multer({ storage })

let userData: Array<Record<string,string>> = []
app.post("/api/files",upload.single("file"), async( req,res)=>{
    // TODO:
    // 1. Extract Values from request
    const {file} = req
    // 2. Validate is not null or empty
    if(!file){
        return res.status(500).json({message:"File is Required"})
    }
    // 3. Validete type file
    if(file.mimetype != "text/csv"){
        return res.status(500).json({message:"File must be CSV"})
    }
    let json :Array<Record<string,string>> = []
    try {
        // 4. Convert file CSV to a string
        const csv = Buffer.from(file.buffer).toString("utf-8")
        // 5. transform string to json
        json = csvToJson.csvStringToJson(csv)
    } catch (error) {
        return res.status(500).json({message:"Error parsing file"})
    }
    // 6. Save JSON data
    userData = json
    // 7. Retrun 200 with a message and object wiht info.

    return res.status(200).json({data: userData,message:"The file was successfully uploaded"})

})

app.get("/api/users",async (req,res)=>{
    //TODO:
    // 1. Extract query param
    const {q} = req.query
    // 2. Validate param
    if(!q){
        return res.status(500).json({
            message :'Query parameter "q" is required'
        })
    }
    if(Array.isArray(q)){
        return res.status(500).json({
            message :'Query parameter "q" is required'
        })
    }
    // 3. Filter data with query
    // The filter should search for partial matches and be case insensitive.
    const search = q.toString().toLowerCase();
    const filterData = userData.filter(row =>{
        return Object
        .values(row)
        .some(value => value.toLowerCase().includes(search))
    })
    // 4. Retrun 200 with data filtered

    return res.status(200).json({data : filterData})

})
// Start Server
app.listen(port, () =>{
    console.log(`Server Running at port:${port}`)
})