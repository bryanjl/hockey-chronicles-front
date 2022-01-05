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