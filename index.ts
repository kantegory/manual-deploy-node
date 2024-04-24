import express from "express"
import { createServer } from "http"
import sequelize from "./src/settings/db"

import Person from "./src/models/Person";

async function testConnection() {
    try {
        await sequelize.authenticate();
        console.log('Connection has been established successfully.');
    } catch (error) {
        console.error('Unable to connect to the database:', error);
    }
}

const app = express()
app.use(express.json())

app.get('/', async (request: express.Request, response: express.Response) => {
    const persons = await Person.findAll()

    return response.send(persons)
})


app.post('/', async (request: express.Request, response: express.Response) => {
    const person = await Person.create(request.body)

    return response.send(person)
})


const server = createServer(app)

server.listen(8000, () => {
    sequelize
        .sync()
        .then(() => {
            console.log('synced models')
            testConnection()
        })
        .catch((e) => console.log(e));

    console.log('server started')
})
