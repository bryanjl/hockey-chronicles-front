import { Tabs, Tab } from "@material-ui/core";

const TeamTabs = ({ setTab, currTab }) => {

    const handleChange = (event, newValue) => {
        setTab(newValue);
    }

    return (
        <Tabs value={currTab} onChange={handleChange}>
            <Tab label="Games" />
            <Tab label="Fights" />
        </Tabs>
    )
}

export default TeamTabs;
