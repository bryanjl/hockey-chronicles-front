import {
    createStyles,
    alpha,
    makeStyles,
  } from '@material-ui/core/styles';
  import SearchIcon from '@material-ui/icons/Search';
  import InputBase from '@material-ui/core/InputBase';
  
  const useStyles = makeStyles((theme) =>
    createStyles({
      search: {
        borderBottom: '3px solid black',
        borderLeft: '3px solid black',
        borderRight: '3px solid #F74902',
        borderTop: '3px solid #F74902',
        position: 'relative',
        borderRadius: theme.shape.borderRadius,
        backgroundColor: alpha(theme.palette.common.white, 0.15),
        '&:hover': {
          backgroundColor: alpha(theme.palette.common.white, 0.25),
        },
        // marginLeft: 0,
        marginBottom: '10px',
        marginTop: '10px',
        width: '100%',
        [theme.breakpoints.up('sm')]: {
          // marginLeft: theme.spacing(1),
          width: 'auto',
        },
      },
      searchIcon: {
        padding: theme.spacing(0, 2),
        height: '100%',
        position: 'absolute',
        pointerEvents: 'none',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        color: '#F74902'
      },
      inputRoot: {
        color: 'inherit',
        // border: '1px solid black'
      },
      inputInput: {
        
        padding: theme.spacing(1, 1, 1, 0),
        // vertical padding + font size from searchIcon
        paddingLeft: `calc(1em + ${theme.spacing(4)}px)`,
        transition: theme.transitions.create('width'),
        width: '100%',
        [theme.breakpoints.up('sm')]: {
          width: '12ch',
          '&:focus': {
            width: '20ch',
          },
        },
      },
    })
  );
  
  export default function Search({ handleSearch }) {
    const classes = useStyles();

    const search = (e) => {
          // handleSearch(e.target.value);
          if (e.keyCode === 13) {
            if(e.target.value === ''){
              return;
            }
            let query = `term=${e.target.value}`;
            handleSearch(query);
            // console.log(query);
        }
    }

    return (
      <div className={classes.search}>
        <div className={classes.searchIcon}>
          <SearchIcon />
        </div>
        <InputBase
          placeholder="Search..."
          fullWidth
          onKeyDown={search}
          classes={{
            root: classes.inputRoot,
            input: classes.inputInput,
          }}
          inputProps={{ 'aria-label': 'search ' }}
        />
      </div>
    );
  }