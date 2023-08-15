//export const URL_API = "https://backend-socialnetwork.onrender.com/"
export const URL_API = "http://localhost:3034/"
export const endpoints = {
    users: `${URL_API}users`,
    posts: `${URL_API}posts`,
    comments: `${URL_API}comments`,
    user: (email, password)=> {
        return `${URL_API}users?email=${email}&password=${password}`
    }
}