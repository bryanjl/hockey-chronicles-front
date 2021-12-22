import fetchApi from "../fetchApi";

//Get a game by ID
export const getGame = async(gameId) => {
    let route = `/games/${gameId}`;

    let options = {
        path: 'GET'
    }

    let result = await fetchApi(route, options);

    return result;
}