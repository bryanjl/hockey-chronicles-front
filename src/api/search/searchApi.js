import fetchApi from "../fetchApi";

export const fightSearch = async(searchParams = '') => {
    let route = `/fights${searchParams}`;

    let options = {
        path: 'GET'
    }

    let response = await fetchApi(route, options);

    console.log(response);

    return response;
}