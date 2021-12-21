import { Grid, makeStyles } from "@material-ui/core";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { 
    fightSearch as fightSearchAPI,
    playerSearch as playerSearchAPI,
    searchAll as searchAllAPI
} from "../../api/search/searchApi";
import SearchResult from "./SearchResult";
const useStyles = makeStyles((theme) => ({

}));

const SearchResults = ({ searchQuery }) => {
    const classes = useStyles();

    const { searchParams } = useParams()

    const [isSearching, setIsSearching] = useState(true);
    const [searchResults, setSearchResults] = useState([]);

    let searchString= ''
    if(searchQuery !== '') {
        searchString = `?term=${searchQuery}`
    }

    //perform search
    useEffect(() => {
        setIsSearching(true);
        console.log(searchParams)
        //api call
        fightSearchAPI(searchString).then((response) => {
            console.log('from search component', response.data);
            setSearchResults(response.data);
            console.log('from searchresults', searchResults);
            setIsSearching(false);
        });
    }, [searchQuery]);
 


    return (
        <Grid container>
            <h1>Search</h1>
            <h1>{searchQuery}</h1>
            {searchResults.map((result) => {
                return <SearchResult key={result._id} result={result} id={result._id} />
            })}
        </Grid>
    )
}

export default SearchResults
