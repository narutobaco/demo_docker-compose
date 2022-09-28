const express = require("express");
const userModel = require("./models");
const app = express();

app.get("/",async (request, response) => {
    const users = await userModel.find({});
    response.render('index', {
        title: 'VNG',
        people: users
    });
})

app.post("/add_user", async (request, response) => {
    const user = new userModel(request.body);
    try {
        await user.save();
        response.send(user);
    } catch (error) {
        response.status(500).send(error);
    }
});
app.get("/users", async (request, response) => {
    const users = await userModel.find({});
    try {
        response.send(users);
    } catch (error) {
        response.status(500).send(error);
    }
});
module.exports = app;
