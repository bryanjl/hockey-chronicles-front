import { Container, makeStyles } from "@material-ui/core"


const useStyles = makeStyles((theme) => ({
    container: {
        paddingTop: theme.spacing(10),
        // backgroundColor: 'red',
        height: '100vh',
        border: '1px solid #ece7e7'
    }
}));

const RightBar = () => {
    const classes = useStyles();
    return (
        <Container className={classes.container}>
            RightBar
        </Container>
    )
}

export default RightBar
