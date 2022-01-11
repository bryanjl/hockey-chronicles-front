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

    //state for data from API
    const [isFetching, setIsFetching] = useState(true);
    const [teamResults, setTeamResults] = useState([]);

    //state for pagination
    const [page, setPage] = useState(1);
    const [numberOfPages, setNumberOfPages] = useState(0);

    //state for league select
    const [leagueValue, setLeagueValue] = useState('');

    //state for search query
    const [searchQuery, setSearchQuery] = useState('');

    //handle page change
    const pageChange = (value) => {
        setPage(value);
    }

    useEffect(() => {
        fetchData(`${leagueValue}${searchQuery}page=${page}`);
    }, [page, leagueValue, searchQuery]);

    const fetchData = (query) => {
        setIsFetching(true);
        getAllTeamsAPI(query).then(data => {
            setTeamResults(data.data);
            setNumberOfPages(data.pagination.totalPages);
            setIsFetching(false);
        });
    }

    const leagueSelect = (league) => {
        setLeagueValue(`term=${league}&`);
        setSearchQuery('');
        setPage(1);
    }

    const teamSearch = (inputQuery) => {
        setSearchQuery(`term=${inputQuery}&`);
        setLeagueValue('');
        setPage(1);
    }

    return (
        <Grid container>
            <Grid item sm={12}>
                <Search handleSearch={teamSearch} />
                <LeagueSelect leagueSelect={leagueSelect} />
            </Grid>
            {!isFetching && 
                teamResults.map((result) => {
                    return <TeamResult key={result._id} team={result} id={result._id} />
                })
            }
            <Paging currPage={page} pageChange={pageChange} totalPages={numberOfPages} />
        </Grid>
    )
}

export default Teams
