import { Card, makeStyles, Typography } from "@material-ui/core";

const useStyles = makeStyles((theme) => ({
    dateCard: {
        display: 'flex',
        justifyContent: 'center',
        padding: '10px',
        margin: '10px'
    }
}));

const DateDisplay = ({ date }) => {
    const classes = useStyles();

    // date = '1960-10-18T17:00:00.000Z'

    let formattedDate = new Date(date.split('T')[0]).toLocaleDateString("en-US", {
        weekday: 'long',
        year: 'numeric',
        month: 'long',
        day: 'numeric'
    });

    return (
        <Card className={classes.dateCard}>
            <Typography>{formattedDate}</Typography>
        </Card>
    )
}

export default DateDisplay;
