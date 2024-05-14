const jwt = require('jsonwebtoken');
const User = require('../models/user');

const userExtractor = async (request, response, next) => {
    try {
        const token = request.cookies?.accessToken;
        if (!token) {
            return response.sendStatus(401);
        }
        const decoded = jwt.verify(token, process.env.ACCESS_TOKEN_SECRET);
        const user = await User.findById(decoded.id);
        request.user = user;
        if (!user) {
            return response.sendStatus(401);
        }

        // Aquí puedes acceder al ID del usuario
        const userId = user._id;

        // Puedes almacenar el ID del usuario en el request para que esté disponible en otros middleware o controladores
        request.userId = userId;

    } catch (error) {
        console.log(error);
        return response.sendStatus(403);
    }

    next();
};

module.exports = { userExtractor };