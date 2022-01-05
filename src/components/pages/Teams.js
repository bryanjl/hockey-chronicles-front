import { Grid, makeStyles } from "@material-ui/core";
import { useEffect, useState } from "react";
import { getAllTeams as getAllTeamsAPI } from "../../api/teams/teamsApi";
// import SearchResult from "../search/SearchResult";
import TeamResult from '../teamProfile/TeamResult';
import Paging from "../Paging";
import LeagueSelect from "../leagueProfile/LeagueSelect";
import Search from "../search/Search";

const useStyles = makeStyles((theme) => ({

}));

const Teams = () => {
    const classes = useStyles();

    const [isFetching, setIsFetching] = useState(true);
    const [teamResults, setTeamResults] = useState([]);

    //state for pagination
    const [page, setPage] = useState(1);
    const [numberOfPages, setNumberOfPages] = useState(0);

    //handle page change
    const pageChange = (value) => {
        setPage(value);
    }

    useEffect(() => {
        setIsFetching(true);
        getAllTeamsAPI(page).then(data => {
            setTeamResults(data.data);
            setNumberOfPages(data.pagination.totalPages);
            setIsFetching(false);
        });
    }, [page]);

    return (
        <Grid container>
            <Grid item sm={12}>
                <Search />
                <LeagueSelect />
            </Grid>
            {!isFetching && 
                teamResults.map((result) => {
                    return <TeamResult key={result._id} team={result} id={result._id} />
                })
            }
            <Paging pageChange={pageChange} totalPages={numberOfPages} />
        </Grid>
    )
}

export default Teams
