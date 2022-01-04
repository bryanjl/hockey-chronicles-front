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
export const getAllPlayers = async(page = 1) => {
    let route = `/players?page=${page}`;

    let options = {
        path: 'GET'
    }

    let result = await fetchApi(route, options);

    return result;
}