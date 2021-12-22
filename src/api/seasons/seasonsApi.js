import fetchApi from "../fetchApi";

export const getSeason = async(seasonId) => {
    let route = `/seasons/${seasonId}`;

    let options = {
        path: 'GET'
    }

    let result = await fetchApi(route, options);

    return result;
}