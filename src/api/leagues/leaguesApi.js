import fetchApi from "../fetchApi";

export const getLeague = async(leagueId) => {
    let route = `/leagues/${leagueId}`;

    let options = {
        path: 'GET'
    }

    let result = await fetchApi(route, options);

    return result;
}

//get all Leagues
export const getAllLeagues = async(page = 1) => {
    let route = `/leagues?page=${page}`;

    let options = {
        path: 'GET'
    }

    let result = await fetchApi(route, options);

    return result;
}