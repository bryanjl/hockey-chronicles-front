import { makeStyles } from "@material-ui/core";
import { Pagination, Stack } from "@mui/material"

const useStyles = makeStyles((theme) =>({
    paging: {
        width: '100%',
        display: 'flex',
        justifyContent: 'center',
        backgroundColor: 'white',
        marginTop: '15px',
        marginBottom: '15px'
    }
}));

const Paging = () => {
    const classes = useStyles();

    return (
        <div className={classes.paging}>
            <Stack spacing={2}>
                <Pagination variant="outlined" size="large" className={classes.paging} count={10} />
            </Stack>
        </div>
    )
}

export default Paging;
