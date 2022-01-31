import { makeStyles } from "@material-ui/core";
import { Pagination, Stack } from "@mui/material"
import { useState } from "react";

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

const Paging = ({ currPage, pageChange, totalPages }) => {
    const classes = useStyles();

    const [page, setPage] = useState(1)

    if(page !== currPage) {
        setPage(currPage);
    }

    const handleChange = (e, value) => {
        // console.log(e.target.textContent);
        // console.log(value);
        pageChange(value);
        setPage(value);
        window.scroll(0, 0);
    }

    return (
        <div className={classes.paging}>
            <Stack spacing={2}>
                <Pagination 
                    variant="outlined" 
                    // size="" 
                    count={totalPages}
                    onChange={handleChange}
                    page={page}
                />
            </Stack>
        </div>
    )
}

export default Paging;
