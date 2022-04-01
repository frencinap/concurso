const express = require('express');
const app = express()
const fs = require('fs')
const { getUsuario, saveUsuario } = require('./helpers/getUsuario.js')
const send = require('./helpers/correo.js')

app.use(express.json())

app.listen(3000, ()=>{
    console.log('Servidor disponible en http://localhost:3000')
})

app.get('/', (req,res)=> {
    //puede ser así tambien
    //res.sendFile(`${__dirname}/index.html`)
    const web = fs.readFileSync('index.html', 'utf8');
    res.setHeader("Content-Type", "text/html")
    res.send(web)
})

//obtener usuario random
app.post('/usuario', async(req,res)=> {
    try {
        const usuario = await getUsuario()
        await saveUsuario(usuario);
        res.send(usuario)

    } catch (error) {
        res.status(500).send(error)

    }
})
//llenar el html con los usuarios obtenidos
app.get('/usuarios', (req,res)=> {
    res.sendFile(`${__dirname}/usuarios.json`)
})

//premio
app.get('/premio', (req,res) => {
    res.sendFile(`${__dirname}/premio.json`)
})

app.put('/premio', (req,res)=> {
    const nuevoPremio = req.body
    fs.writeFileSync('premio.json', JSON.stringify(nuevoPremio, null, 2))
    res.send("Premio modificado con éxito")
})

//ganador
app.get('/ganador', async(req,res)=> {
    try {
        const { usuarios } = JSON.parse(fs.readFileSync('usuarios.json', 'utf8'))
        const { length: total } = usuarios
        const indexGanador = Math.floor(Math.random() * (total - 0)) +0
        const ganador = usuarios[indexGanador]
        const correos = usuarios.map( e => e.correo)
        await send(ganador, correos)
        res.json(ganador)

    } catch (error) {
        res.status(500).send('Algo salió mal', error)
    }

})