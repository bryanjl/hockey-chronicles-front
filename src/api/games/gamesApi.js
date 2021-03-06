import fetchApi from "../fetchApi";

//Get a game by ID
export const getGame = async(gameId) => {
    let route = `/games/${gameId}`;

    let options = {
        method: 'GET'
    }

    let result = await fetchApi(route, options);

    return result;
}

export const getAllGames = async(query) => {
    let route = `/games?${query}`;

    let options = {
        method: 'GET'
    }

    let result = await fetchApi(route, options);

    return result;
}

export const createGame = async(gameInfo) => {
    let route = `/games`;

    let options = {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(gameInfo)
    }

    let response = await fetchApi(route, options);

    return response;
}

export const updateGame = async(gameId, gameInfo) => {
    let route = `/games/${gameId}`;

    let options = {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(gameInfo)
    }

    let response = await fetchApi(route, options);

    return response;
}
