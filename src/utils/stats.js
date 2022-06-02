//get number of final, regular, preseason, totalfights
export const getFightCount = (fights) => {
    let fightCount = {
        finals: 0,
        regular: 0,
        preseason: 0,
        total: 0,
        intra: 0
    }

    if(fights.length !== 0) {
        fights.forEach(fight => {
            if(fight.gameType === 'Regular'){
                fightCount.regular++;
            }
            if(fight.gameType === 'Preseason'){
                fightCount.preseason++;
            }
            if(fight.gameType === 'Final' || fight.gameType === 'Playoff'){
                fightCount.finals++;
            }
            if(fight.teams.length === 1){
                fightCount.intra++;
            }
            fightCount.total++;
        });    
    }    

    return fightCount;
}

//get top 5 highest action fights
export const getHighestAction = (fights) => {
    let top5 = [];

    if(fights.length !== 0){
        fights.sort((a, b) => {
            return b.actionRating.average - a.actionRating.average
        });

        let i = 0, x = 0;
        while(x < 5){
            if(i >= fights.length){
                break;
            }
            if(fights[i].players.length === 0){
                i++;
            } else {
                top5.push(fights[i]);
                i++;
                x++;
            }
        }
    }


    
    return top5;
}

//get the 5 most recent fights added
export const getMostRecent = (fights) => {
    let top5 = [];

    if(fights.length !== 0) {
        fights.sort((a, b) => {
            return new Date(b.createdAt) - new Date(a.createdAt)
        });
    
        for(let i = 0; i < 5; i++){
            if(i >= fights.length){
                break;
            }
            top5.push(fights[i]);
        }
    }    

    return top5;
}