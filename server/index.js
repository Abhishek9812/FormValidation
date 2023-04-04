import  express from "express";
import mongoose from "mongoose";
import cors from 'cors';

const app = express();

app.use(express.json())
app.use(express.urlencoded({ extended: true }))
app.use(cors());
const databaseName = "formValidation";
const url = `mongodb://localhost:27017/${databaseName}`;

mongoose.connect(url, {
    useNewUrlParser: true,
    useUnifiedTopology: true
});

const userSchema = new mongoose.Schema({
    firstName: {
        type: String,
    },
    lastName: {
        type: String,
    },
    email: {
        type: String,
        unique: true
    },
    country: {
        type: String,
    },
    state: {
        type: String,
    },
    city: {
        type: String,
    },
    gender: {
        type: String,
    },
    dob: {
        type: String,
    },
    age: {
        type: String,
    },
});


const UserModel = new mongoose.model("user", userSchema);


app.post('/createUser', async (req, res) => {
    try {
        const { email } = req.body;
        const isUserExist = await UserModel.findOne({ email });
        if (isUserExist) {
            return res.status(203).send({ msg: "user already exist" });
        }

        const userData = new UserModel(req.body);
        await userData.save();
        res.status(200).send({ msg: "success" });

    } catch (error) {
        res.status(404).send({ msg: "something went wrong" });
    }
})

app.get('/getAllUser', async (req, res) => {
    try {
        const allUsers = await UserModel.find({});
        res.status(200).send(allUsers);
    } catch (error) {
        res.status(404).send({ msg: "something went wrong" });
    }
})

app.listen(5000, () => {
    console.log("server started at 5000");
})
