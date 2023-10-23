

const getLoginAuth = async ()=>{
    const loginToken = sessionStorage.getItem("loginToken")
    if (loginToken) {
        return loginToken
    }

    return ""

}

const getPassResetAuth = async ()=>{
    const passResetToken = sessionStorage.getItem("passResetToken")
    console.log(passResetToken);
    if (passResetToken) {
        return passResetToken
    }

    return ""

}


export { getLoginAuth, getPassResetAuth }