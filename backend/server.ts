import express from "express";
import cors from "cors";
import multer from "multer";
import csvToJson from "convert-csv-to-json";

const app = express();
const port = process.env.PORT ?? 3000;

app.use(cors()); // Enable cors

// Set multer save in memory
const storage = multer.memoryStorage();
const upload = multer({ storage });

let userData: Array<Record<string, string>> = [];
app.post("/api/files", upload.single("file"), async (req, res) => {
  const { file } = req;
  if (!file) {
    return res.status(500).json({ message: "File is Required" });
  }
  if (file.mimetype != "text/csv") {
    return res.status(500).json({ message: "File must be CSV" });
  }

  let json: Array<Record<string, string>> = [];
  try {
    const csv = file.buffer.toString("utf-8");

    json = csvToJson.fieldDelimiter(",").csvStringToJson(csv);
  } catch (error) {
    return res.status(500).json({ message: "Error parsing file" });
  }

  userData = json;

  return res
    .status(200)
    .json({ data: userData, message: "The file was successfully uploaded" });
});

app.get("/api/users", async (req, res) => {
  const { q } = req.query;
  if (!q) {
    return res.status(500).json({
      message: 'Query parameter "q" is required',
    });
  }
  if (Array.isArray(q)) {
    return res.status(500).json({
      message: 'Query parameter "q" is required',
    });
  }
  const search = q.toString().toLowerCase();
  const filterData = userData.filter((row) => {
    return Object.values(row).some((value) =>
      value.toLowerCase().includes(search)
    );
  });

  return res.status(200).json({ data: filterData });
});

app.listen(port, () => {
  console.log(`Server Running at port:${port}`);
});
