import loginStorage from "./loginStorage"

const getAuthenticationHeaders = () => {
    const user = loginStorage.loadUser()
    if(!user) {
        return {
            headers: { Authorization: `bearer FalseToken`}
        }
    }
    return {
        headers: { Authorization: `bearer ${user.token}` }
    }
}

export default {
    getAuthenticationHeaders
}