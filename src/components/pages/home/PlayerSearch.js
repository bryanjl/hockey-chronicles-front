import { Button, InputBase, makeStyles, Paper, Typography } from "@material-ui/core"
import { useState } from "react";

const useStyles = makeStyles((theme) => ({
    container: {
        // height: '150px',
        // width: '350px',
        padding: '15px',
        margin: '15px'
    },
    inputRoot: {
        // backgroundColor: 'gray',
        // color: 'white'
        border: '1px solid gray',
        paddingLeft: '5px'

    },
    searchBtn: {
        backgroundColor: theme.palette.black.main,
        color: theme.palette.orange.main,
        marginTop: '10px'
    }
}));

const PlayerSearch = ({ handleClick }) => {
    const classes = useStyles();

    const [searchValue, setSearchValue] = useState('');

    const playerSearchInput = (e) => {
        setSearchValue(e.target.value)
    }

    const searchBtn = () => {
        handleClick(searchValue);
    }

    return (
        <Paper elevation={8} className={classes.container}>
            <Typography variant='h5' style={{borderBottom: '3px solid #F74902', backgroundColor: 'black', color: 'white', padding: '5px'}}>Search<Typography variant='h5' display="inline" style={{color: '#F74902', fontWeight: 'bolder'}}>PLAYERS</Typography></Typography>
            <InputBase
                placeholder="Type Player's Name"
                classes={{
                    root: classes.inputRoot,
                    input: classes.inputInput
                }}
                style={{marginTop: '15px', marginBottom: '15px'}}
                fullWidth
                onChange={playerSearchInput}
                inputProps={{ 'aria-label': 'search ' }}
                
            ></InputBase>
            <Button className={classes.searchBtn} variant="outlined" fullWidth onClick={searchBtn}>Search</Button>
        </Paper>
    )
}

export default PlayerSearch;
