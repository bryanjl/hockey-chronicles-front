import fetchApi from "../fetchApi";

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

