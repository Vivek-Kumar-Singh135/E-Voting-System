var Adhar = ""
var Name = ""
var Epic = ""
var AuthKey = ""
var AC = ""
var PC = ""
var voteStatus = ""


const setField = (AdharVal, EpicVal, AuthKeyVal) => {
    Adhar = AdharVal
    Epic = EpicVal
    AuthKey = AuthKeyVal
}

const setDetails = (NameVal, EpicVal, Ac, Pc) => {
    Name = NameVal
    Epic = EpicVal
    AC = Ac
    PC = Pc
}

const setVoteStatus = (status) => {
    voteStatus = status
}

const getId = () => {
    return AuthKey
}
const getAdhar = () => {
    return Adhar
}
const getEpic = () => {
    return Epic
}
const getAuthKey = () => {
    return AuthKey
}

const getName = () => {
    return Name
}

const getAC = () => {
    return AC
}

const getPC = () => {
    return PC
}

const getVoteStatus = () => {
    return voteStatus
}

export { setField, setDetails, setVoteStatus, getId, getAdhar, getEpic, getAuthKey, getName, getAC, getPC, getVoteStatus }