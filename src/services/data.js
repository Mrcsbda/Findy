export const URL_API = "https://backend-socialnetwork.onrender.com/"

export const endpoints = {
    users: `${URL_API}users`,
    posts: `${URL_API}posts`,
    comments: `${URL_API}comments`,
    user: (username, password)=> {
        return `${URL_API}users?username=${username}&password=${password}`
    }
}