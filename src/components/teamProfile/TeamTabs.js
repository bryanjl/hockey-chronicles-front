import { Tabs, Tab } from "@material-ui/core";

const TeamTabs = ({ setTab, currTab }) => {

    const handleChange = (event, newValue) => {
        setTab(newValue);
    }

    return (
        <Tabs 
            value={currTab} 
            onChange={handleChange}
            TabIndicatorProps={{style: {backgroundColor: '#F74902'}}}
            style={{marginBottom: '10px'}}
        >
            <Tab label="Games" />
            <Tab label="Fights" />
            <Tab label="Intra-Squad Fights" />
            <Tab label="Rivals" />
            <Tab label="Fighters" />
        </Tabs>
    )
}

export default TeamTabs;
