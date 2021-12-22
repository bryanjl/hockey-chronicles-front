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