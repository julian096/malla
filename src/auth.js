import jwt from 'vue-jwt-decode'

var user = null;

function isAuth(){
    try {
        let token = jwt.decode(sessionStorage.getItem("token"));
        user = token.identity[1];
        return isExpired()
    } catch (error) {
        return false
    }
}

function isExpired(){
    let token = jwt.decode(sessionStorage.getItem('token'));
    let exp = new Date()
    exp.setUTCSeconds(token.exp)

    return exp.valueOf() > new Date().valueOf()
}

function isAdmin(){
    let token = jwt.decode(sessionStorage.getItem("token"));
    return token.identity[1] == 0
}

function isBoss(){
    let token = jwt.decode(sessionStorage.getItem("token"));
    return token.identity[1] == 1 
}

function isComm(){
    let token = jwt.decode(sessionStorage.getItem("token"));
    return token.identity[1] == 2 
}

function isTeacher(){
    let token = jwt.decode(sessionStorage.getItem("token"));
    return token.identity[1] == 3
}


export {isAuth, isAdmin, isTeacher, isComm, isBoss, user};
