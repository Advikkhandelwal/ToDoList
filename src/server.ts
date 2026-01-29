// import dotenv from "dotenv"
import App from "./app"

// dotenv.config()

const port = process.env.PORT || 4000

const server = new App(port)
server.startServer()
