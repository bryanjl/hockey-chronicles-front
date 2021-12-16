import fetchApi from '../fetchApi';
import { getToken, getUsername, getUserId } from '../auth/authApi';

export const postComment = async(recordId, text, parentId = null) => {
    let route = `/fights/${recordId}/comments`;

    let token = getToken();
    let userId = getUserId();
    let username = getUsername();

    let reqBody = {
        body: text,
        user: userId,
        parentId: parentId,
        username: username
    }

    let options = {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify(reqBody)     
    }

    let response = await fetchApi(route, options);

    return response.data;
}

export const getComments = async(recordId) => {
    let route = `/fights/${recordId}/comments`;

    let options = {
        method: 'GET'
    }

    let response = await fetchApi(route, options);

    return response.data;
}

export const updateComment = () => {

}

//takes in record ID
// export const getComments = (recordId) => {
//     let route = `/games/${recordId}/comments`

//     let options = {
//         method: 'GET'
//     }

//     let comments = fetchApi(route, options);

//     return comments;
// }

export const deleteComment = () => {
    
}