require('dotenv').config()
const express = require("express");
const app = express();
const cors = require("cors");
const port = process.env.PORT || 3000;

app.use(cors());
app.use(express.json());

app.get('/api/jobs', async(req,res) => {
    res.send("Connected");
})

app.listen(port,()=>{
    console.log(`listening from port ${port}`);
})