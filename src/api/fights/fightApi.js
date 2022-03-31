import fetchApi from "../fetchApi";
import { getToken } from "../auth/authApi";

//Get fight by ID
export const getFight = (fightId = '') => {
    let route = `/fights/${fightId}`;
    
    let options = {
        method: 'GET'
    }

    let data = fetchApi(route, options);

    return data;
}

//Get all fights fight by ID
export const getAllFights = (query = '') => {
    let route = `/fights?${query}`;
    
    let options = {
        method: 'GET'
    }

    let data = fetchApi(route, options);

    return data;
}

//createFight
export const createFight = (fightInfo) => {
    let route = `/fights`;

    let options = {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(fightInfo)
    }

    let response = fetchApi(route, options);

    return response;
}

//updateFight
export const updateFight = (fightInfo, fightId) => {
    let route = `/fights/${fightId}`;

    let options = {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(fightInfo)
    }

    let response = fetchApi(route, options);

    return response;
}

//delete a fight
export const deleteFight = (fightId) => {
    let route = `/fights/${fightId}`;

    let options = {
        method: 'DELETE',
    }

    let response = fetchApi(route, options);

    return response;
}


//Post a comment to a fight
export const postComment = (fightId, comment) => {
    let route = `/fights/${fightId}/comments`;

    let options = {
        method: 'POST',
        body: JSON.stringify(comment)
    }

    let data = fetchApi(route, options);

    return data;
}

//Update the outcome after a vote
export const updateOutcome = (fightId, outcome) => {
    let route = `/fights/${fightId}`;

    let options = {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(outcome)
    }

    let data = fetchApi(route, options);

    return data;
}

//get TopFive teams/players
export const getTopFive = (season) => {
    let route = `/fights/topfive${season}`;

    let options = {
        method: 'GET',
    }

    let data = fetchApi(route, options);

    return data;
}

export const getFeaturedFight = async() => {
    let route = `/fights/featuredfight`;

    let options = {
        method: 'GET'
    }

    let response = await fetchApi(route, options);

    return response;
}

export const setFeaturedFight = async(fightId) => {
    let token = getToken();
    let route = '/fights/featuredfight';

    let options = {
        method: 'PUT',
        headers: {
            'Authorization': `Bearer ${token}`,
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(fightId)
    }

    let response = await fetchApi(route, options);

    return response;
}

