const axios = require('axios');
const { v4 } = require('uuid')
const fs = require('fs').promises

const getUsuario = async() => {
    const { data } = await axios.get('https://randomuser.me/api');
    const usuario = data.results[0];
    const user = {
        id: v4().slice(30),
        correo: usuario.email,
        nombre: `${usuario.name.title} ${usuario.name.first} ${usuario.name.last}`,
        pais: usuario.location.country,
        foto: usuario.picture.thumbnail
    }
    return user
}

const saveUsuario = async(usuario)=> {
    const usuariosJson = await fs.readFile('usuarios.json', "utf8")
    const { usuarios } = JSON.parse(usuariosJson)
    usuarios.push(usuario)
    await fs.writeFile('usuarios.json', JSON.stringify(({usuarios}), null, 2))
}

module.exports = { getUsuario, saveUsuario }