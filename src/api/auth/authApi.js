import fetchApi from "../fetchApi";
// import { badRequestHandling } from "../../components/auth/Login";

export const getToken = () => {
    let token = localStorage.getItem('token');

    return token;
}

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
    // if(token.success === false) {
    //     badRequestHandling(token.msg)
    // }
    
    // console.log(token);

    localStorage.setItem('token', token.token);

    return token;
}

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

    localStorage.setItem('token', token.token);
}

export const logout = () => {

}
