import fetchApi from "../fetchApi";

export const fightSearch = async(searchParams = '') => {
    let route = `/search/fights${searchParams}`;

    let options = {
        path: 'GET'
    }

    let response = await fetchApi(route, options);

    console.log(response);

    return response;
}

export const playerSearch = async(searchParams = '') => {
    let route = `/search/players${searchParams}`;

    let options = {
        path: 'GET'
    }

    let response = await fetchApi(route, options);

    return response;
}

export const searchAll = async(searchParams = '') => {
    let route = `/search${searchParams}`;

    let options = {
        path: 'GET'
    }

    let response = fetchApi(route, options);

    return response;
}