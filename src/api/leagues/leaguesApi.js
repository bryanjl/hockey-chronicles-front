import fetchApi from "../fetchApi";

export const getLeague = async(leagueId) => {
    let route = `/leagues/${leagueId}`;

    let options = {
        path: 'GET'
    }

    let result = await fetchApi(route, options);

    return result;
}