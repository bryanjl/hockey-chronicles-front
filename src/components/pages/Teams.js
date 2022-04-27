import { Typography } from "@material-ui/core";
import { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";
import { getAllTeams as getAllTeamsAPI } from "../../api/teams/teamsApi";
import TeamResult from '../teamProfile/TeamResult';
import Paging from "../Paging";
import Search from "../search/Search";
import LinearLoadingAnimation from "../feedback/LinearLoadingAnimation";

const Teams = () => {
    const [searchParams, setSearchParams] = useSearchParams();

    //state for data from API
    const [isFetching, setIsFetching] = useState(true);
    const [teamResults, setTeamResults] = useState([]);

    //state for pagination
    const [page, setPage] = useState(1);
    const [numberOfPages, setNumberOfPages] = useState(0);

    useEffect(() => {
        //get params
        let searchTerm = searchParams.get('term');
        let query = '';
        if(searchTerm) {
            query = `term=${searchTerm}&`;
        }
        
        let pageParam = parseInt(searchParams.get('page')) || 1;
        setPage(pageParam);

        fetchData(`${query}page=${pageParam}`);
    }, [searchParams]);

    const fetchData = (query) => {
        setIsFetching(true);
        getAllTeamsAPI(query).then(data => {
            console.log(data);
            setTeamResults(data.data);
            setNumberOfPages(data.pagination.totalPages);
            setIsFetching(false);
        });
    }

    const teamSearch = (inputQuery) => {
        setSearchParams(`${inputQuery}&page=1`);
    }

    //page change function
    const pageChange = (value) => {
        //before changing page check to see if there is a search
        //query and add to the searchParams
        let searchTerm = `term=${searchParams.get('term')}&`;
        if(!searchParams.get('term')) {
            searchTerm = '';
        }
        setSearchParams(`?${searchTerm}page=${value}`);
    }

    return (
        <>
            <Typography variant="h5" style={{backgroundColor: 'black', color: 'white', borderBottom: '3px solid #F74902', padding: '5px', paddingLeft: '15px', marginTop: '15px'}}>Teams</Typography>  
            <Search handleSearch={teamSearch} />
            
            {isFetching &&
                <LinearLoadingAnimation />
            }
            {!isFetching && 
                teamResults.map((result) => {
                    return <TeamResult key={result._id} team={result} id={result._id} />
                })
            }
            <Paging currPage={page} pageChange={pageChange} totalPages={numberOfPages} />
        </>
    )
}

export default Teams;