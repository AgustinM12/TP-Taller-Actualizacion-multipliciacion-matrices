import express, { Router } from "express"
import { fileURLToPath } from "url"
import { dirname, join } from "path"
import { ctrlSum } from "./src/controller/calculator.controller.js"

const app = express()

const calculatorRoute = Router()

const __filename = fileURLToPath(import.meta.url)

const __dirname = dirname(__filename)

const htmlPath = join(__dirname, "src/views/index.html")

const publicPath = join(__dirname, "src/public")

app.use(express.json())

app.use(express.static(publicPath))

app.use(express.urlencoded({ extended: true }));

//RUTAS
calculatorRoute.get("/arrayCalculator", (req, res) => {
    res.sendFile(htmlPath)
})

calculatorRoute.post("/arrayCalculation", ctrlSum)

app.use(calculatorRoute)

app.listen(5000, () => {
    console.log("Servidor corridendo en localhost:" + 5000)
})