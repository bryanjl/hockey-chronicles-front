import fetchApi from "../fetchApi";
import jwtDecode from "jwt-decode";

//get token from local storage
export const getToken = () => {
    let token = localStorage.getItem('token');
    
    return token;
}

//get username from localstorage
export const getUsername = () => {
    let username = localStorage.getItem('username');
    console.log('here');
    return username;
}

export const getUserId = () => {
    try {
        let token = getToken();  
        let user = jwtDecode(token); 
        return user.id; 
    } catch (error) {
        //how to handle not logged in user???
        console.log(error);
        return null;
    }
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

    let user = await fetchApi(route, options);

    // set token and username to localstorage
    localStorage.setItem('token', user.token);
    // setUserName();

    return user;
}

//register for new account with API
export const register = async (fdUserDetails) => {
    let route = `/auth/register`;

    let options = {
        method: 'POST',
        
        body: fdUserDetails
    }

    let user = await fetchApi(route, options);

    // set token and username to localstorage
    localStorage.setItem('token', user.token);

    return user;
}

//clear localstorage of token and username
export const logout = () => {
    localStorage.setItem('token', null);
    localStorage.setItem('username', '');
}

//get user details from API
export const getUserDetails = async() => {
    let token = getToken();

    let route = `/auth/me`;
    let options = {
        method: 'GET',
        headers: {
            'Authorization': `Bearer ${token}`
        }
    }

    let user = await fetchApi(route, options);

    if(user.success === false) {
        return null;
    }

    return user.data;
}

//update user profile
export const updateUser = async(fdUserInfo) => {
    let token = getToken();

    let route = `/auth/updatedetails`;
    let options = {
        method: 'PUT',
        headers: {
            'Authorization': `Bearer ${token}`
        },
        body: fdUserInfo
    }

    let user = await fetchApi(route, options);

    return user;
}

export const forgotPassword = async(email) => {
    let route = `/auth/forgotpassword`;

    let options = {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(email)
    }

    let response =  await fetchApi(route, options);

    return response;
}

export const resetPassword = async(password, resetToken) => {
    let route = `/auth/resetpassword/${resetToken}`;

    let options = {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(password)
    }

    let response = await fetchApi(route, options);

    return response;
}
