const loginRouter = require('express').Router();
const User = require('../models/user');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');


loginRouter.post('/', async (request, response)=>{
try {
    console.log('Inicio de la solicitud de inicio de sesión');
console.log('Datos de la solicitud:', request.body);

const {email, password } = request.body;
console.log('Email:', email);
const userExist = await User.findOne ({ email });
console.log('Usuario encontrado:', userExist);

if (!userExist) {
return response.status(400).json({error:'email o contraseña invalidos.'});
};
if (!userExist.verified) {
return response.status(400).json({error:'Tu email no ha sido verificado.'});    
};

const isCorrect = await bcrypt.compare(password, userExist.passwordHash);

if (!isCorrect) {
    return response.status(400).json({error:'email o contraseña invalidos.'});
};

const userForToken = {
    id: userExist.id
}

const accessToken = jwt.sign(userForToken, process.env.ACCESS_TOKEN_SECRET ,{
    expiresIn: '1d'
});



response.cookie('accessToken', accessToken, {
 expires: new Date(Date.now() + 1000 * 60 * 60 * 24 * 1),   
 secure:process.env.NODE_ENV === 'production',
 httpOnly: true,
});

console.log('Cookie establecida');

console.log('Fin de la solicitud de inicio de sesión');

return response.status(200).json(userExist);

} catch (error) {
    
console.log("este es el error:",error);

}



});

module.exports = loginRouter;
