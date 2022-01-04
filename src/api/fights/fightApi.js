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
export const getAllFights = (page = 1) => {
    let route = `/fights?page=${page}`;
    
    let options = {
        method: 'GET'
    }

    let data = fetchApi(route, options);

    return data;
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

