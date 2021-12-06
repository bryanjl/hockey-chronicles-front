import fetchApi from "../fetchApi";

export const getFight = (fightId = '') => {
    let route = `/fights/${fightId}`;
    
    let options = {
        method: 'GET'
    }

    let data = fetchApi(route, options);

    return data;
}

export const postComment = (fightId, comment) => {
    let route = `/fights/${fightId}/comments`;

    let options = {
        method: 'POST',
        body: JSON.stringify(comment)
    }

    let data = fetchApi(route, options);

    return data;
}

