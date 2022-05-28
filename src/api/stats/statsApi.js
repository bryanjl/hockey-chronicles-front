import fetchApi from "../fetchApi";

//Get a season by ID
export const getSeasonAndLeagueStats = async(query) => {
    let route = `/stats/games?${query}`;

    let options = {
        method: 'GET'
    }

    let result = await fetchApi(route, options);

    return result;
}