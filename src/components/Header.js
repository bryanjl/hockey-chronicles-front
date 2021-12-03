import { AppBar, Toolbar, Typography, makeStyles, InputBase, alpha, Badge, Avatar } from '@material-ui/core';
import { Search, Notifications, Cancel } from '@material-ui/icons';
import { useState } from 'react';

const useStyles = makeStyles((theme) => ({
    header: {
        backgroundColor: theme.palette.primary.main
    },
    logoLg: {
        display: 'none',
        [theme.breakpoints.up('md')]: {
            display: 'block'
        }
    },
    logoSm: {
        display: 'none',
        [theme.breakpoints.down('sm')]: {
            display: 'block'
        }
    },
    toolbar: {
        display: 'flex',
        justifyContent: 'space-between'
    },
    search: {
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        backgroundColor: alpha(theme.palette.common.white, 0.15),
        '&:hover': {
            backgroundColor: alpha(theme.palette.common.white, 0.25)
        },
        borderRadius: theme.shape.borderRadius,
        width: '50%',
        [theme.breakpoints.down('sm')]: {
            display: (props) => (props.open ? 'flex' : 'none'),
            // width: '70%'
        }
    },
    input: {
        color: 'white',
        marginLeft: theme.spacing(1)
    },
    icons: {
        display: (props) => (props.open ? 'none' : 'flex'),
        alignItems: 'center',
        margin: theme.spacing(1)
    },
    avatar: {
        marginLeft: theme.spacing(2)
    },
    searchBtn: {
        // display: 'flex',
        [theme.breakpoints.up('md')]: {
            display: 'none'
        },
        marginRight: theme.spacing(1)
    },
    cancelSearch: {
        [theme.breakpoints.up('md')]: {
            display: 'none'
        }
    }
}))

const Header = () => {
    const [open, setOpen] = useState(false);
    const classes = useStyles({ open });
    return (
        <AppBar className={classes.header} position='fixed'>
            <Toolbar className={classes.toolbar}>
                <Typography variant='h5' component='h2' className={classes.logoLg}>
                    Hockey Fight Chronicles
                </Typography>
                <Typography variant='h5' component='h2' className={classes.logoSm}>
                    HFC
                </Typography>
                <div className={classes.search}>
                    <Search />
                    <InputBase placeholder='Search' className={classes.input} fullWidth/>
                    <Cancel className={classes.cancelSearch} onClick={() => setOpen(false)} />
                </div>
                <div className={classes.icons}>
                    <Search className={classes.searchBtn} onClick={() => setOpen(true)} />
                    <Badge badgeContent={4} color='secondary'>
                        <Notifications />
                    </Badge>
                    <Avatar className={classes.avatar} src='#'></Avatar>
                </div>
            </Toolbar>
        </AppBar>
    )
}

export default Header;
