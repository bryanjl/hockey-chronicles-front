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
        userId: userId,
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

    response.data.comments[response.data.comments.length - 1].userId = response.data.comments[response.data.comments.length - 1].user;

    // console.log('response', response.data.comments[response.data.comments.length - 1]);

    return response.data.comments[response.data.comments.length - 1];
}

export const getComments = async(recordId) => {
    let route = `/fights/${recordId}/comments`;

    let options = {
        method: 'GET'
    }

    let response = await fetchApi(route, options);
    // console.log('getcomments response', response.data);

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