// const baseUrl = 'https://hockey-chronicles-api.herokuapp.com/api/v1';
// const baseUrl = 'http://localhost:5000/api/v1';

let baseUrl;

if(process.env.NODE_ENV === 'development'){
    baseUrl = 'https://hockey-chronicles-api.herokuapp.com/api/v1';
} else {
    baseUrl = 'https://hockey-chronicles-api.herokuapp.com/api/v1';
}


const fetchApi = async (route, options) => {
    const response = await fetch(`${baseUrl}${route}`, options);

   //console.log('fetch', response.json());

    return response.json();
}

export default fetchApi;
// module.exports = fetchApi

