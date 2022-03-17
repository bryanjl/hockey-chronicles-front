import fetchApi from "../fetchApi";

//Get a season by ID
export const getSeason = async(seasonId) => {
    let route = `/seasons/${seasonId}`;

    let options = {
        path: 'GET'
    }

    let result = await fetchApi(route, options);

    return result;
}

//Get all seasons without fight data
export const getAllSeasons = async() => {
    let route = `/seasons?select=-fights`;

    let options = {
        path: 'GET'
    }

    let result = await fetchApi(route, options);

    return result;
}

//create a new season
export const createSeason = async(seasonInfo) => {
    let route = `/seasons`;

    let options = {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(seasonInfo)
    }

    let response = await fetchApi(route, options);

    return response;
}