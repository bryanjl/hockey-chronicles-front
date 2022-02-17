import fetchApi from "../fetchApi";

//get a team by ID
export const getTeam = async(teamId) => {
    let route = `/teams/${teamId}`;

    let options = {
        path: 'GET'
    }

    let result = await fetchApi(route, options);

    return result;
}

//get all teams
export const getAllTeams = async(query = '') => {
    let route = `/teams?${query}`;

    let options = {
        path: 'GET'
    }

    let result = await fetchApi(route, options);

    return result;
}

//fuzzy search for teams
export const teamsSearch = async(userInput = '') => {
    let route = `/teams/search?lastName=${userInput}`;

    let options = {
        path: 'GET'
    }

    let result = await fetchApi(route, options);

    return result;
}