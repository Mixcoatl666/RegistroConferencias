import jwt from 'jsonwebtoken';

const generarJWT = (id,sexo,rol) =>{
    // generar un web token, esto firma el payload
    // {objeto},llave privada,{expiracion}
    return jwt.sign({id,sexo,rol}, process.env.JWT_SECRET, {expiresIn:'15d'})
}

export default generarJWT;