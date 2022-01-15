import fetchApi from '../fetchApi';
import { getToken, getUsername, getUserId } from '../auth/authApi';

export const postComment = async(model, recordId, text, parentId = null) => {
    let route = `/${model}/${recordId}/comments`;

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

export const getComments = async(model, recordId) => {
    let route = `/${model}/${recordId}/comments`;

    let options = {
        method: 'GET'
    }

    let response = await fetchApi(route, options);
    // console.log('getcomments response', response.data);

    return response.data;
}

export const updateComment = (model, recordId, text, commentId) => {
    let route = `/${model}/${recordId}/comments`;

    let token = getToken();

    let reqBody = {
        body: text,
        commentId
    }

    let options = {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify(reqBody)
    }

    fetchApi(route, options);
}

export const deleteComment = (model, recordId, commentId) => {
    console.log(commentId);

    let route = `/${model}/${recordId}/comments`;

    let token = getToken();

    let reqBody = {
        commentId
    }

    let options = {
        method: 'DELETE',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify(reqBody)
    }

    fetchApi(route, options);
}