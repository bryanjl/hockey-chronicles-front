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