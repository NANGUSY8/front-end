export const setToken = (token) => {
    return localStorage.setItem("TOKEN", token)
}
export const getToken = () => {
    // console.log(localStorage.getItem("TOKEN"))
    return localStorage.getItem("TOKEN")
}
export const removeToken = () => {
    return localStorage.removeItem("TOKEN")
}