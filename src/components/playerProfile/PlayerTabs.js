import { Tabs, Tab } from "@material-ui/core";

const PlayerTabs = ({ setTab, currTab }) => {
    const handleChange = (event, newValue) => {
        setTab(newValue);
    }

    return (
        <Tabs 
            value={currTab} 
            onChange={handleChange}
            TabIndicatorProps={{style: {backgroundColor: '#F74902'}}}
        >
            <Tab label="All Fights" />
            <Tab label="Rivals" />
        </Tabs>
    )
}

export default PlayerTabs;
