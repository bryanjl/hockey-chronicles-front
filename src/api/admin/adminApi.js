import fetchApi from "../fetchApi";

//get token from local storage
const getToken = () => {
    let token = localStorage.getItem('token');
    
    return token;
}

//get user details from API
export const getAllUsers = async() => {
    let token = getToken();

    let route = `/admin/users`;
    let options = {
        method: 'GET',
        headers: {
            'Authorization': `Bearer ${token}`,
        }
    }

    let response = await fetchApi(route, options);

    return response;
}

//update user roles
export const setUserRole = async(userId, reqBody) => {
    let token = getToken();
    
    let route = `/admin/users/${userId}`;
    let options = {
        method: 'PUT',
        headers: {
            'Authorization': `Bearer ${token}`,
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(reqBody)
    }

    let response = await fetchApi(route, options);

    return response;
}

export const deleteUser = async(userId) => {
    let token = getToken();
    
    let route = `/admin/users/${userId}`;
    let options = {
        method: 'DELETE',
        headers: {
            'Authorization': `Bearer ${token}`
        }
    }

    let response = await fetchApi(route, options);

    return response;
}