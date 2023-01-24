import app from "./Src/main.js"

// ouvinte da porta
const port = 3000
app.listen(port, () => {
    console.log("Api online na porta: http://localhost:"+port)
})