const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const hashPassword = (password) => {
    const saltRounds = 10;
    const salt = bcrypt.genSaltSync(saltRounds);
    return bcrypt.hashSync(password, salt);
};

const matchPassword = (password, hashedPassword) => {
    return bcrypt.compareSync(password, hashedPassword);
};

const generateToken = (id) => {
    return jwt.sign({
        id
    }, process.env.SECRET_KEY, {expiresIn: '24d'});
};



async function verifyToken(req, res, next) {

    try {
        const token = req.headers.token;
        if (!token) {
            const error = new Error('Access Denied.');
            error.statusCode = 401;
            next(error);
        }
        const verified =  jwt.verify(token,process.env.SECRET_KEY) ;
        req.user = verified;
        next();
    } catch (error) {
        next(error);
    }
}

const groupItemsByAddedBy = (items) => {
    return items.reduce((result, item) => {
      // Get the 'addedBy' ID of the current item
      const addedById = item.addedBy;
  
      // If the 'addedBy' ID doesn't exist in the result object, create a new array for it
      if (!result[addedById]) {
        result[addedById] = [];
      }
  
      // Push the current item into the array corresponding to the 'addedBy' ID
      result[addedById].push(item);
  
      return result;
    }, {}); // Initial value is an empty object
  };
  
module.exports = {
    hashPassword,
    matchPassword,
    generateToken,
    verifyToken,
    groupItemsByAddedBy
};