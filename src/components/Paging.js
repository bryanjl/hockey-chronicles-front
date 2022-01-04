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

const Paging = ({ pageChange, totalPages }) => {
    const classes = useStyles();

    const handleChange = (e, value) => {
        // console.log(e.target.textContent);
        // console.log(value);
        pageChange(value);
        window.scroll(0, 0);
    }

    return (
        <div className={classes.paging}>
            <Stack spacing={2}>
                <Pagination 
                    variant="outlined" 
                    size="large" 
                    count={totalPages}
                    onChange={handleChange}
                />
            </Stack>
        </div>
    )
}

export default Paging;
