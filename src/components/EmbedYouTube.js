import { Container, makeStyles } from "@material-ui/core";
import YouTube from "react-youtube";

const useStyles = makeStyles((theme) => ({
    container: {
        width: '75%',
        [theme.breakpoints.down('sm')]: {
            width: '100%'
        },
        display: 'flex',
        justifyContent: 'center',
        marginTop: '15px'
    },
    youtube: {
        maxWidth: '100%'
    }
}));

const EmbedYouTube = () => {
    const classes = useStyles();

    return (
        
    <Container className={classes.container}>
        <YouTube className={classes.youtube} videoId='B7_KJEwCAao' />
    </Container>
        
    )
}

export default EmbedYouTube;


