import { Container, makeStyles } from "@material-ui/core";
import YouTube from "react-youtube";

const useStyles = makeStyles((theme) => ({
    container: {
        width: '100%',
        [theme.breakpoints.down('sm')]: {
            width: '100%'
        },
        display: 'flex',
        justifyContent: 'center',
        marginTop: '15px'
    },
    youtube: {
        maxWidth: '100%'
    },
    noVideoContainer: {
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        marginTop: '15px'
    },
    noVideoImg: {
        height: '75%',
        width: '50%'
    }
}));

const EmbedYouTube = ({ videoLink = '' }) => {
    const classes = useStyles();

    if(videoLink !== ''){
      let vidID = videoLink.split('=')[1];
      return (
        <Container className={classes.container}>
            <YouTube className={classes.youtube} videoId={vidID} />
        </Container>     
      )   
    }

    if(videoLink === ''){
        return (
            <Container className={classes.noVideoContainer}>
                <img className={classes.noVideoImg} src='/no-video-available.jpg' alt='No Video' />
            </Container>
        )
    }
}

export default EmbedYouTube;


