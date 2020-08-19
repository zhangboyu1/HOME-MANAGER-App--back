const crypto = require(`crypto`)

// keydsadsadsa

const SECRET_KEY = "BoYu_111#"

function md5(content) {
    let md5 = crypto.createHash('md5')
    return md5.update(content).digest('hex')
}


const generatePassword = (password) => {
    const password_cryp = `password =${password}&key=${SECRET_KEY}`
    return md5(password_cryp)
}

module.exports = {
    generatePassword
}