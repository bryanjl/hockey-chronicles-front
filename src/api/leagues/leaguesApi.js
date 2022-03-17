import fetchApi from "../fetchApi";

export const getLeague = async(leagueId) => {
    let route = `/leagues/${leagueId}`;

    let options = {
        method: 'GET'
    }

    let result = await fetchApi(route, options);

    return result;
}

//get all Leagues
export const getAllLeagues = async(page = 1) => {
    let route = `/leagues?page=${page}`;

    let options = {
        method: 'GET'
    }

    let result = await fetchApi(route, options);

    return result;
}

export const createLeague = async(leagueInfo) => {
    let route = `/leagues`;

    //send in form data

    let fdLeagueInfo = new FormData();
  
    fdLeagueInfo.append('name', leagueInfo.name);
    fdLeagueInfo.append('description', leagueInfo.description);
    fdLeagueInfo.append('leagueImg', leagueInfo.leagueImg);

    let options = {
        method: 'POST',
        
        body: fdLeagueInfo
    }

    let response = await fetchApi(route, options);

    return response;
}