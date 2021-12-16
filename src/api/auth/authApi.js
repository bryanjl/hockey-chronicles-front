import fetchApi from "../fetchApi";
import jwtDecode from "jwt-decode";

//get token from local storage
export const getToken = () => {
    let token = localStorage.getItem('token');
    // console.log(jwtDecode(token));

    return token;
}

//get username from localstorage
export const getUsername = () => {
    let username = localStorage.getItem('username');

    return username;
}

export const getUserId = () => {
    let token = getToken();

    let user = jwtDecode(token);

    return user.id;
}

//login to API
export const login = async (credentials) => {
    let route = `/auth/login`;

    let options = {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(credentials)
    }

    let token = await fetchApi(route, options);

    // set token and username to localstorage
    localStorage.setItem('token', token.token);
    setUserName();

    return token;
}

//register for new account with API
export const register = async (userDetails) => {
    let route = `/auth/register`;

    let options = {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(userDetails)
    }

    let token = await fetchApi(route, options);

    // set token and username to localstorage
    localStorage.setItem('token', token.token);
    setUserName();
}

//clear localstorage of token and username
export const logout = () => {
    localStorage.setItem('token', null);
    localStorage.setItem('username', '');
}

//get user details from API
export const getUserDetails = async() => {
    let token = getToken();
    console.log(token);

    let route = `/auth/me`;
    let options = {
        method: 'GET',
        headers: {
            'Authorization': `Bearer ${token}`
        }
    }

    let user = await fetchApi(route, options);

    return user.data;
}

//set username to local storage
const setUserName = async () => {
    let user = await getUserDetails();

    localStorage.setItem('username', user.username);
}
