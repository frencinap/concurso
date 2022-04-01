const nodemailer = require('nodemailer')

const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
        user: "nodemailerADL@gmail.com",
        pass: "fullstackjavascript"
    }
})

const send = async(ganador, correos) => {
    const mailOptions = {
        from: "nodemailerADL@gmail.com",
        to: ["nodemailerADL@gmail.com",].concat(correos),
        subject: `${ganador.nombre} ha ganado!`,
        html: `<h2>Anuncio: El ganador del concurso es ${ganador.nombre}!, gracias a todos por participar</h2>`,

    }
    await transporter.sendMail(mailOptions)
}

module.exports = send