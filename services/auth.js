// Session-Based Authentication

// const sessionIdToUserMap = new Map();

// function setUser(id, user){
//     return sessionIdToUserMap.set(id, user);
// }

// function getUser(id){
//    return sessionIdToUserMap.get(id);
// }

// module.exports = {
//     setUser,
//     getUser
// }


// Jwt-Based Authentication

const jwt = require('jsonwebtoken')

function setUser(user){
    return jwt.sign({
        _id: user._id,
        email: user.email,
    }, 'karthik$H$1234');
}

 
function getUser(token){
    if(!token) return null;
    
    return jwt.verify(token, 'karthik$H$1234');
}

module.exports = {
    setUser,
    getUser
}
