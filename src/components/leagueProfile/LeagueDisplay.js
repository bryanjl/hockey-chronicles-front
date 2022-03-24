import { Card, makeStyles, Typography } from "@material-ui/core";
import { Grid } from "@mui/material";


const useStyles = makeStyles((theme) => ({
    leagueLogo: {
        maxHeight: '80px',
        width: 'auto',
        margin: '15px'
    }
}))

const LeagueDisplay = ({ league }) => {
    const classes = useStyles();

    return (
        <Card>
            <Grid container>
                <Grid item xs={4}>
                    <img className={classes.leagueLogo} src={`/images/leagues/${league.name}.png`} alt='nhl' />
                </Grid>
                <Grid item xs={8}>
                    <Typography>
                        {league.description ? league.description : ''}
                    </Typography>
                </Grid>
            </Grid>            
        </Card>
    )
}

export default LeagueDisplay;