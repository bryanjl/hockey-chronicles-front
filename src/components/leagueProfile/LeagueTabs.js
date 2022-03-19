import { Tabs, Tab, makeStyles } from "@material-ui/core";

const useStyles = makeStyles((theme) => ({
    tabs: {
        marginBottom: '15px'
    }
}));

const LeagueTabs = ({ setTab, currTab }) => {
    const classes = useStyles();

    const handleChange = (event, newValue) => {
        setTab(newValue);
    }

    return (
        <Tabs className={classes.tabs} value={currTab} onChange={handleChange}>
            <Tab label="Games" />
            <Tab label="Fights" />
        </Tabs>
    )
}

export default LeagueTabs;