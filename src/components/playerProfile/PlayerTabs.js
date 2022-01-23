import { Tabs, Tab } from "@material-ui/core";

const PlayerTabs = ({ setTab, currTab }) => {
    const handleChange = (event, newValue) => {
        setTab(newValue);
    }

    return (
        <Tabs value={currTab} onChange={handleChange}>
            <Tab label="All Fights" />
            <Tab label="Highest Action" />
            <Tab label="Win by Type" />
            <Tab label="Fights by Season" />
        </Tabs>
    )
}

export default PlayerTabs;
