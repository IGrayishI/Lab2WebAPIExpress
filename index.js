const { Console } = require("console");
const express =  require("express");
const axios = require("axios");
const app = express();
const PORT = 3000;
const path = require("path");
const cors = require("cors");
app.use(express.json()); 
app.use(cors());

const connectonString = `https://bkk-webapilab220240118143400-as.azurewebsites.net`

//Home/Documentation
app.get("/", async (req, res) => {
    try {
        res.sendFile(path.join(__dirname, "documentation.html"));
    
    } catch (error) {
        res.status(500).send("Server Error");
    }
});

//Read all
app.get("/book", async (req, res) => {
    try {
        let response = await axios.get(connectonString + `/book`);
        res.json(response.data);
        
    } catch (error) {
        res.status(500).send("Server Error");
    }
});

//Read by Id
app.get("/book/:id", async (req, res) => {
    try {
        const id = parseInt(req.params.id);
        let response = await axios.get(connectonString + `/book/${id}`);

            res.json(response.data);
        
    } catch (error) {

        if (error.response && error.response.status === 404) {
            res.status(404).send("Id not Found");
        } else {
            res.status(500).send("Server Error");
        }
    }
});

//Create
app.post("/book", async (req, res) => {
    try {
        let bookData = req.body;
        
        let response = await axios.post(connectonString + "/book", bookData);
        
        res.json(response.data);
    
    } catch (error) {
        res.status(500).send("Server Error");
    }
});

//Update
app.put("/book/:id", async (req, res) => {
    try {
        let id = parseInt(req.params.id);
        let updateBookData = req.body;

        let response = await axios.put(connectonString + `/book/${id}`, updateBookData);
        
        if(response.status === 204) {
            res.status(404).send("Id not found");
        } else {
            res.json({title: updateBookData.title, author: updateBookData.author});
        }

    } catch (error) {

        if (error.response && error.response.status === 404) {
            res.status(404).send("Id not Found");
        } else {
            res.status(500).send("Server Error");
        }
    }
});

//Delete
app.delete("/book/:id", async (req, res) => {
    try {
        let id = parseInt(req.params.id);
        
        let response = await axios.delete(connectonString + `/book/${id}`);
        
            res.json(response.data);
        
    } catch (error) {

        if (error.response && error.response.status === 404) {
            res.status(404).send("Id not Found");
        } else {
            res.status(500).send("Server Error");
        }
    }
})

app.listen(PORT, () => {
    console.log("Listening to " + PORT);
});