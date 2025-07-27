require("dotenv").config();
var jwt = require("jsonwebtoken");
const cookieParser = require("cookie-parser");
const express = require("express");
const { MongoClient, ServerApiVersion, ObjectId } = require("mongodb");
const app = express();
const cors = require("cors");
const port = process.env.PORT || 3000;

app.use(cors());
app.use(express.json());
app.use(cookieParser());

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
        const applicationCollection = client
            .db("job_hunt")
            .collection("job_applications");
        app.get("/api/jobs", async (req, res) => {
            const result = jobCollection.find();
            const jobs = await result.toArray();
            res.send(jobs);
        });

        app.get("/api/jobs/:id", async (req, res) => {
            const id = req.params.id;
            const query = { _id: new ObjectId(id) };
            const result = await jobCollection.findOne(query);
            res.send(result);
        });

        // get apllications
        app.get("/api/job-applications", async (req, res) => {
            const email = req.query.email;

            if (!email) {
                const allApps = await applicationCollection.find().toArray();
                console.log("Returning all applications:", allApps.length);
                return res.send(allApps);
            }

            try {
                const query = {
                    email,
                };
                const result = await applicationCollection
                    .find(query)
                    .toArray();
                for (const application of result) {
                    const jobQuery = { _id: new ObjectId(application.job_id) };
                    const jobFind = await jobCollection.findOne(jobQuery);
                    if (jobFind) {
                        application.company = jobFind.company;
                        application.title = jobFind.title;
                        application.company_logo = jobFind.company_logo;
                    }
                }
                return res.send(result);
            } catch (err) {
                console.error("Error in /api/job-applications:", err);
                res.status(500).json({ message: "Server error" });
            }
        });

        // post applications
        app.post("/api/job-applications", async (req, res) => {
            const application = req.body;
            const result = await applicationCollection.insertOne(application);

            const id = application.job_id;
            const query = { _id: new ObjectId(id) };
            const job = jobCollection.findOne(query);
            let newCount = 0;
            if (job.applicationCount) {
                newCount = job.applicationCount + 1;
            } else {
                newCount = 1;
            }

            const filter = { _id: new ObjectId(id) };
            const updateDoc = {
                $set: {
                    applicationCount: newCount,
                },
            };
            const updatedResult = jobCollection.updateOne(filter, updateDoc);
            res.status(200).json({
                message: "Application submitted successfully",
                data: result,
            });
        });

        // JWT

        console.log(
            "Pinged your deployment. You successfully connected to MongoDB!"
        );
    } finally {
        // await client.close();
    }
}
run().catch(console.dir);

app.get("/", async (req, res) => {
    res.send("API is Connected to vercel");
});

app.listen(port, () => {
    console.log(`listening from port ${port}`);
});
