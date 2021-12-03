import { Container, makeStyles, Typography } from '@material-ui/core';
import { Home, Person } from '@material-ui/icons';
import Logout from '@mui/icons-material/Logout'

const useStyles = makeStyles((theme) => ({
    container: {
        paddingTop: theme.spacing(10),
        backgroundColor: theme.palette.primary.main,
        height: '100vh',
        [theme.breakpoints.up('sm')]: {
            backgroundColor: "white",
            color: "#555",
            border: '1px solid #ece7e7'
        }
    },
    item: {
        display: 'flex',
        alignItems: 'center',
        marginBottom: theme.spacing(4),
        [theme.breakpoints.up('sm')]: {
            marginBottom: theme.spacing(3),
            cursor: 'pointer'
        }
    },
    icon: {
        marginRight: theme.spacing(1),
        [theme.breakpoints.up('sm')]: {
            fontSize: '18px'
        }
    },
    text: {
        fontWeight: '500',
        [theme.breakpoints.down('sm')]: {
            display: 'none'
        }
    }
}));

const LeftBar = () => {
    const classes = useStyles();
    return (
        <Container className={classes.container}>
            <div className={classes.item}>
                <Home className={classes.icon}/>
                <Typography className={classes.text}>Homepage</Typography>
            </div>
            <div className={classes.item}>
                <Person className={classes.icon}/>
                <Typography className={classes.text}>Person</Typography>
            </div>
            <div className={classes.item}>
                <Logout className={classes.icon}/>
                <Typography className={classes.text}>Logout</Typography>
            </div>
        </Container>
    )
}

export default LeftBar;
