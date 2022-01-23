import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import PlayerTabs from "./PlayerTabs";
import GameEvent from "../gameProfile/GameEvent";
import WinLossDrawChart from "../charts/WinLossDrawChart";
import { 
    getPlayer as getPlayerAPI 
} from "../../api/players/playersApi";
import { Grid, makeStyles, Typography } from "@material-ui/core";

const useStyles = makeStyles((theme) => ({
    headshotImg: {
        maxHeight: '100px',
        width: 'auto',
        margin: '5px'
    }
}));

const PlayerProfile = () => {
    let { playerID } = useParams();

    const classes = useStyles();

    //state for player data
    const [player, setPlayer] = useState({});

    //state for current tab
    const [selectedTab, setSelectedTab] = useState(0);

    //state for isfetchng from API
    const [isFetching, setIsFetching] = useState(true); 

    useEffect(() => {
        setIsFetching(true);
        getPlayerAPI(playerID).then(data => {
            console.log(data);
            setPlayer(data.data);
            setIsFetching(false);
        });
    }, [playerID]);

    const setTab = (value) => {
        setSelectedTab(value);
    }

    return (
        <>
            {/* <h1>Player Profile Page</h1> */}
            {!isFetching && 
                <>
                    <Grid container>
                        <Grid item xs={12}>
                            <Typography variant='h3'>{player.firstName} {player.lastName}</Typography>
                        </Grid>
                        <Grid item xs={3}>
                            <img className={classes.headshotImg} src='/no-headshot.jpg' alt='no-headshot' />
                        </Grid>
                        <Grid item xs={5}>
                            <Typography>
                                Position: {player.position}
                            </Typography>
                            <Typography>
                                Shoots: {player.shoots === 'L' ? 'Left' : 'Right'}
                            </Typography>
                            <Typography>
                                Height: {player.height}
                            </Typography>
                            <Typography>
                                Weight: {player.weight}
                            </Typography>
                        </Grid>
                        <Grid item xs={4}>
                            <WinLossDrawChart wins={player.wins} draws={player.draws} losses={player.losses} />
                        </Grid>
                    </Grid>
                    {/* <p>W-L-D: {player.wins}-{player.losses}-{player.draws}</p> */}
                    {/* <p>Action Rating: {player.actionRating.average} {player.actionRating.votes}</p> */}
                    {/* <p>Unfair: {player.unfairTally}</p>                 */}
                <PlayerTabs setTab={setTab} currTab={selectedTab} />
                {selectedTab === 0 && 
                    player.fights.map(fight => {
                        return <GameEvent key={fight._id} event={fight} />
                    })
                }
                </>
            }
            
        </>
    )
}

export default PlayerProfile;
