require("dotenv").config();
const express = require("express");
const { MongoClient, ServerApiVersion, ObjectId } = require("mongodb");
const app = express();
const cors = require("cors");
const port = process.env.PORT || 3000;

app.use(cors());
app.use(express.json());

const uri = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASS}@cluster0.cqkzp8h.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0`;

const client = new MongoClient(uri, {
    serverApi: {
        version: ServerApiVersion.v1,
        strict: true,
        deprecationErrors: true,
    },
});

async function run() {
    try {
        const jobCollection = client.db("job_hunt").collection("jobs");

        app.get("/api/jobs", async (req, res) => {
            const result = jobCollection.find();
            const jobs = await result.toArray();
            res.send(jobs);
        });

        app.get("/api/jobs/:id", async (req, res) => {
            const id = req.params.id;
            const query = {_id:new ObjectId(id)};
            const result = await jobCollection.findOne(query);
            res.send(result);
        });
        console.log(
            "Pinged your deployment. You successfully connected to MongoDB!"
        );
    } finally {
        // await client.close();
    }
}
run().catch(console.dir);

app.get("/", async (req, res) => {
    res.send("Connected");
});

app.listen(port, () => {
    console.log(`listening from port ${port}`);
});
