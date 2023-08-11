export const initialUser = {
    isAuthenticated: false,
    user: null
}

export const userReducer = (state = initialUser, action) => {
    switch (action.type) {
        case "login":
            return action.payload;
        case "Logout":
            return initialUser;
        case "update":
            return {
                ...state,
                user: {
                    ...state.user,
                    ...action.payload
                }
            };
        default:
            return state;
    }
}