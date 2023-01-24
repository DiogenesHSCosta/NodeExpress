import Express from "express"
import cors from "cors"
import indexController from "./Controllers/indexController.js"
import db from "./Database/sqlite.js"
import middlewaresPadrao from "./Middlewares/config.js"

const app = Express()

middlewaresPadrao(app, Express, cors)//middlewares. Tem que vir antes das rotas

indexController(app, db)//Rotas

export default app