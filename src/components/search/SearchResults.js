import { Grid, makeStyles } from "@material-ui/core";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { fightSearch as fightSearchAPI } from "../../api/search/searchApi";
import SearchResult from "./SearchResult";
const useStyles = makeStyles((theme) => ({

}));

const SearchResults = () => {
    const classes = useStyles();

    const { searchParams } = useParams()

    const [isSearching, setIsSearching] = useState(true);
    const [searchResults, setSearchResults] = useState([]);

    //perform search
    useEffect(() => {
        setIsSearching(true);
        console.log(searchParams)
        //api call
        // fightSearchAPI(searchParams).then((response) => {
        //     console.log('from search component', response.data);
        //     setSearchResults(response.data);
        //     console.log('from searchresults', searchResults);
        //     setIsSearching(false);
        // });
    }, []);
 


    return (
        <Grid container>
            {searchResults.map((result) => {
                return <SearchResult key={result._id} result={result} />
            })}
        </Grid>
    )
}

export default SearchResults
