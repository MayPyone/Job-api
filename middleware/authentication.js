const jwt = require('jsonwebtoken');
const UnauthenticatedError = require('../errors/UnauthenticatedError');

const auth = async (req, res, next) => {
  const authHeader = req.headers.authorization;

  if (!authHeader || !authHeader.startsWith('Bearer')) {
    console.log('Authorization header missing or malformed');
    throw new UnauthenticatedError('Authentication is invalid');
  }

  const token = authHeader.split(' ')[1];
  

  
  try {
    const payload = jwt.verify(token, process.env.JWTPRIVATEKEY, { algorithms: ['HS256'] });
    
    req.user = { firstName: payload.firstName, email: payload.email };
    // res.status(200).send({message: "Job in successfully" },req.user);
    
    next();
  } catch (error) {
    console.log('Token verification failed:', error.message);
    throw new UnauthenticatedError('Authent ication Invalid');
  }
 };

module.exports = auth;
