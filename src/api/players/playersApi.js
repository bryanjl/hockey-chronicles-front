import fetchApi from "../fetchApi";

//Get a player by ID
export const getPlayer = async(playerId) => {
    let route = `/players/${playerId}`;

    let options = {
        path: 'GET'
    }

    let result = await fetchApi(route, options);

    return result;
}

//Get all players
export const getAllPlayers = async(query = '') => {
    let route = `/players?${query}`;

    let options = {
        path: 'GET'
    }

    let result = await fetchApi(route, options);

    return result;
}

//fuzzy search for players
export const playerSearch = async(userInput = '') => {
    let route = `/players/search?lastName=${userInput}`;

    let options = {
        path: 'GET'
    }

    let result = await fetchApi(route, options);

    return result;
}