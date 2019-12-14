const TOKEN_KEY = 'tresor-ad';

export const login = (data) => {
    localStorage.setItem(TOKEN_KEY, JSON.stringify(data));
}

export const logout = () => {
    localStorage.removeItem(TOKEN_KEY);
}

export const isLogin = () => {

    if (localStorage.getItem(TOKEN_KEY)) {
        return true;
    }

    return false;
}


export const getLoginData = () => {

    return JSON.parse(localStorage.getItem(TOKEN_KEY));
     
}