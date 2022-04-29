import fetchApi from "../fetchApi";

//get a team by ID
export const getTeam = async(teamId) => {
    let route = `/teams/${teamId}`;

    let options = {
        method: 'GET'
    }

    let result = await fetchApi(route, options);

    return result;
}

export const getTeamSeasonData = async(teamId, seasonValue) => {
    let route = `/teams/${teamId}?season=${seasonValue}`;

    let options = {
        method: 'GET'
    }

    let result = await fetchApi(route, options);

    return result;
}

//get all teams
export const getAllTeams = async(query = '') => {
    let route = `/teams?${query}`;

    let options = {
        method: 'GET'
    }

    let result = await fetchApi(route, options);

    return result;
}

//create a new team
export const createTeam = async(teamInfo) => {
    let route = `/teams`;

    //send in form data

    let fdTeamInfo = new FormData();
  
    fdTeamInfo.append('city', teamInfo.city);
    fdTeamInfo.append('name', teamInfo.name);
    fdTeamInfo.append('league', teamInfo.league);
    fdTeamInfo.append('yearsActive', teamInfo.yearsActive);
    fdTeamInfo.append('teamImg', teamInfo.teamImg);

    let options = {
        method: 'POST',
        
        body: fdTeamInfo
    }

    let response = await fetchApi(route, options);

    return response;
}

//update a team
export const updateTeam = async(teamId, teamInfo) => {
    let route = `/teams/${teamId}`;
    
    let options = {
        method: 'PUT',
        
        body: teamInfo
    }

    let response = await fetchApi(route, options);

    return response;

    // let options = {
    //     method: 'PUT',
    //     headers: {
    //         'Content-Type': 'application/json'
    //     },
    //     body: JSON.stringify(teamInfo)
    // }

    // let response = await fetchApi(route, options);

    // return response;
}

//fuzzy search for teams
export const teamsSearch = async(userInput = '') => {
    let route = `/teams/search?lastName=${userInput}`;

    let options = {
        method: 'GET'
    }

    let result = await fetchApi(route, options);

    return result;
}