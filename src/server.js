import express from 'express';
import { getPlayerData } from './controller/lol.controller.js'
import cors from 'cors'

var app = express();

app.use(cors())

app.get("/", async (req, res) => {
    const data = await getPlayerData(req.query.name)
    const response = res.json(data)
    return response
})

app.listen(3000, () => {
    console.log("Server running on port 3000");
});