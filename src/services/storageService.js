export const saveSession = (user) => {
    localStorage.setItem("user", JSON.stringify(user))
}

export const getSession = () => {
    const user = localStorage.getItem("user")
    return JSON.parse(user) || {}
}