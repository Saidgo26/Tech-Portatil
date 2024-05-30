const usersRouter = require('express').Router();
const jwt = require('jsonwebtoken');
const User = require('../models/user');
const bcrypt = require('bcrypt');
const nodemailer = require("nodemailer");
const { PAGE_URL } = require('../config')





usersRouter.get('/', async (request, response) => {
  try {
    const userId = request.user.id; // Suponiendo que el ID del usuario está en la propiedad 'id' del objeto 'user'
    response.json({ userId });
    
  } catch (error) {
    console.log(error);
  }
});

usersRouter.post('/' , async (request, response)=>{
  console.log('Inicio de la solicitud de creación de usuario');
  console.log('Datos de la solicitud:', request.body);
const{name, email, password} = request.body;
if(!name||!email||!password){
return response.status(400).json({error:'Todos los espacios son requeridos'})
}
console.log(name, email, password);
const userExists = await User.findOne({email})

if (userExists){
  return response.status(400).json({error:'El email ya se encuentra en uso'})
};

const saltRounds = 10;

const passwordHash = await bcrypt.hash(password , saltRounds);

const newUser = new User({
    name,
    email,
    passwordHash,
    role: 'client',
});

const savedUser = await newUser.save();
console.log('Usuario creado:', savedUser);

const token = jwt.sign({id:savedUser.id}, process.env.ACCESS_TOKEN_SECRET, {
    expiresIn: '1d'
});

const transporter = nodemailer.createTransport({
    host: 'smtp.gmail.com',
    port: 465,
    secure: true, 
    auth: {
      user: process.env.EMAIL_USER,
      pass: process.env.EMAIL_PASS,
    },
  });
const info = await transporter.sendMail({
    from: process.env.EMAIL_USER, 
    to: savedUser.email,
    subject: 'verificacion de usuario',
    html: `<a href="${PAGE_URL}/verify/${savedUser.id}/${token}">Verificar correo</a>`, 
  });  
console.log(token);
console.log(savedUser.role);

return response.status(201).json({ message: 'Usuario creado. Por favor verifica tu correo', user: savedUser });

});


usersRouter.patch('/:id/:token' , async (request, response)=>{

try {
    
    const token = request.params.token;
    const decodedToken = jwt.verify(token, process.env.ACCESS_TOKEN_SECRET);
    const id = decodedToken.id;
    await User.findByIdAndUpdate(id, {verified: true});
    return response.sendStatus(200)
    
} catch (error) {
  // Encontrar el email del usuario
  const id = request.params.id;
  const {email} = await User.findById(id);



  // firmar el nuevo token
    const token = jwt.sign({id:id}, process.env.ACCESS_TOKEN_SECRET, {
      expiresIn: '1d'
    });
  // Enviar el email  
  const transporter = nodemailer.createTransport({
      host: 'smtp.gmail.com',
      port: 465,
      secure: true, 
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS,
      },
    });
    const info = await transporter.sendMail({
      from: process.env.EMAIL_USER, 
      to: email,
      subject: 'verificacion de usuario',
      html: `<a href="${PAGE_URL}/verify/${id}/${token}">Verificar correo</a>`, 
    });  

    
    return response.status(400).json({error: 'El link ya expiro. se ha enviado un nuevo link de verificacion a su correo'});
  }
  
  
  
  
});

usersRouter.get('/:id', async (request, response) => {
  try {
      const user = await User.findById(request.params.id);
      if (!user) {
          return response.status(404).json({ error: 'Usuario no encontrado' });
      }
      return response.status(200).json({ name: user.name, id: user._id});
  } catch (error) {
      console.error(error);
      return response.sendStatus(500);
  }
});



console.log('Fin de la solicitud de creación de usuario');

module.exports = usersRouter;
