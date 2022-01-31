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
        backgroundColor: theme.palette.primary.light,
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
            <Typography variant="h5">Search Fights</Typography>
            <InputBase
                placeholder="Search Fights"
                classes={{
                    root: classes.inputRoot,
                    input: classes.inputInput
                }}
                fullWidth
                onChange={fightSearchInput}
                inputProps={{ 'aria-label': 'search ' }}
            ></InputBase>
            <Button className={classes.searchBtn} variant="outlined" fullWidth onClick={searchBtn}>Search</Button>
        </Paper>
    )
}

export default FightSearch
