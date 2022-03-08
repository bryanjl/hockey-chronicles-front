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

const TeamSearch = ({ handleClick }) => {
    const classes = useStyles();

    const [searchValue, setSearchValue] = useState('');

    const teamSearchInput = (e) => {
        setSearchValue(e.target.value)
    }

    const searchBtn = () => {
        handleClick(searchValue);
    }

    return (
        <Paper elevation={8} className={classes.container}>
            <Typography variant="h5">Search Teams</Typography>
            <InputBase
                placeholder="Type Team Name"
                classes={{
                    root: classes.inputRoot,
                    input: classes.inputInput
                }}
                fullWidth
                onChange={teamSearchInput}
                inputProps={{ 'aria-label': 'search ' }}
                
            ></InputBase>
            <Button className={classes.searchBtn} variant="outlined" fullWidth onClick={searchBtn}>Search</Button>
        </Paper>
    )
}

export default TeamSearch;