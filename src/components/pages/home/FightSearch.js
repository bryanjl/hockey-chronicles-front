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

const FightSearch = ({ handleClick }) => {
    const classes = useStyles();

    const [searchValue, setSearchValue] = useState('');

    const fightSearchInput = (e) => {
        setSearchValue(e.target.value);
    }

    const searchBtn = () => {
        handleClick(searchValue);
    }

    return (
        <Paper elevation={8} className={classes.container}>
            <Typography variant='h5' style={{borderBottom: '3px solid #F74902', backgroundColor: 'black', color: 'white', padding: '5px'}}>Search<Typography variant='h5' display="inline" style={{color: '#F74902', fontWeight: 'bolder'}}>FIGHTS</Typography></Typography>
            <InputBase
                placeholder="Search Fights"
                classes={{
                    root: classes.inputRoot,
                    input: classes.inputInput
                }}
                fullWidth
                style={{marginTop: '15px', marginBottom: '15px'}}
                onChange={fightSearchInput}
                inputProps={{ 'aria-label': 'search ' }}
            ></InputBase>
            <Button className={classes.searchBtn} variant="outlined" fullWidth onClick={searchBtn}>Search</Button>
        </Paper>
    )
}

export default FightSearch
