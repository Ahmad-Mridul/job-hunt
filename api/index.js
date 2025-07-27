require("dotenv").config();
const { MongoClient, ServerApiVersion, ObjectId } = require("mongodb");
var jwt = require("jsonwebtoken");
const cookieParser = require("cookie-parser");
const express = require("express");
const app = express();
const cors = require("cors");
const port = process.env.PORT || 3000;

app.use(
    cors({
        origin: ["http://localhost:5173"],
        credentials: true,
    })
);
app.use(express.json());
app.use(cookieParser());

//. todo middleware verify token

const verifyToken = (req, res, next) => {
    const token = req?.cookies?.token;
    if (!token) {
        return res.status(401).send({ message: "Unauthorized access" });
    }
    jwt.verify(token, process.env.SECRET_KEY, (err, decoded) => {
        if (err) {
            return res.status(401).send({ message: "Unauthorized access" });
        }
        req.user = decoded;
        next();
    });
};

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

        app.get("/api/jobs", verifyToken, async (req, res) => {
            console.log("now inside the get api");
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
        app.get("/api/my-applications", verifyToken, async (req, res) => {
            const email = req.query.email;
            if (!email) {
                const allApps = await applicationCollection.find().toArray();
                console.log("Returning all applications:", allApps.length);
                return res.send(allApps);
            }

            const query = {
                email,
            };

            if(req.user.email!==email){
                return res.status(403).send({message:"forbidden access"});
            }


            const result = await applicationCollection.find(query).toArray();
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
        });

        // JWTAPI
        app.post("/jwt", async (req, res) => {
            const user = req.body;
            const token = jwt.sign(user, process.env.SECRET_KEY, {
                expiresIn: "1hr",
            });
            res.cookie("token", token, {
                httpOnly: true,
                secure: false,
            }).send(token);
        });

        // post applications
        app.post("/api/my-applications", async (req, res) => {
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
