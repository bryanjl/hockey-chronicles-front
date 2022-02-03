//check if all values in outcome obj are = 1
//initial outcome 
export const checkIfInitialOutcome = (outcomeObj) => {
    return Object.values(outcomeObj).every((value, _index, arr) => {
        if(value === 1) {
            return true;
        }
        return false;
    });
};

//check if the outcome winner is = to playerId
export const checkOutcomeWinner = (outcomeObj, playerId) => {
    if (
        Object.keys(outcomeObj).reduce((a, b) => {
            return outcomeObj[a] > outcomeObj[b] ? a : b
        }) === playerId 
    ) {
        return true;
    }
    return false;
}

//check if the outcome is a draw
export const checkIfDrawOutcome = (outcomeObj) => {
    if (
        Object.keys(outcomeObj).reduce((a, b) => {
            return outcomeObj[a] > outcomeObj[b] ? a : b
        }) === 'draw' 
    ) {
        return true;
    }
    return false;
}




