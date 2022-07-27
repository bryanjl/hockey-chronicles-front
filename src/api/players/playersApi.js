import fetchApi from "../fetchApi";

//Get a player by ID
export const getPlayer = async(playerId) => {
    let route = `/players/${playerId}`;

    let options = {
        method: 'GET'
    }

    let result = await fetchApi(route, options);

    return result;
}

//Get all players
export const getAllPlayers = async(query = '') => {
    let route = `/players?${query}`;

    let options = {
        method: 'GET'
    }

    let result = await fetchApi(route, options);

    return result;
}

//create a new player
export const createPlayer = async(playerInfo) => {
    let route = `/players`;

    //send in form data

    let fdPlayerInfo = new FormData();
  
    fdPlayerInfo.append('firstName', playerInfo.firstName);
    fdPlayerInfo.append('lastName', playerInfo.lastName);
    fdPlayerInfo.append('nickname', playerInfo.nickname);
    fdPlayerInfo.append('yearsActive', playerInfo.yearsActive);
    fdPlayerInfo.append('position', playerInfo.position);
    fdPlayerInfo.append('shoots', playerInfo.shoots);
    fdPlayerInfo.append('weight', playerInfo.weight);
    fdPlayerInfo.append('height', playerInfo.height);
    fdPlayerInfo.append('playerImg', playerInfo.playerImg);

    console.log(fdPlayerInfo)

    let options = {
        method: 'POST',
        
        body: fdPlayerInfo
    }

    let response = await fetchApi(route, options);

    console.log(response)

    return response;
}

export const updatePlayer = async(playerId, playerInfo) => {
    let route = `/players/${playerId}`;

    let options = {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(playerInfo)
    }

    let result = await fetchApi(route, options);

    return result;
}

//fuzzy search for players
export const playerSearch = async(userInput = '') => {
    let route = `/players/search?lastName=${userInput}`;

    let options = {
        method: 'GET'
    }

    let result = await fetchApi(route, options);

    return result;
}