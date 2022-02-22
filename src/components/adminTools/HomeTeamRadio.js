import Radio from '@mui/material/Radio';
import RadioGroup from '@mui/material/RadioGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import FormControl from '@mui/material/FormControl';
import FormLabel from '@mui/material/FormLabel';

const HomeTeamRadio = ({ teams, updateHomeTeam }) => {
    const handleChange = (e) => {
        // console.log(e.target.value);
        updateHomeTeam(e.target.value);
    }

    // let team1 = teams[0];
    // let team2 = teams[1];

  return (
    <FormControl component="fieldset">
    <FormLabel component="legend">Choose Home Team</FormLabel>
    <RadioGroup
      aria-label="home-team"
      defaultValue={teams[0].home ? teams[0].id : teams[1].id}
      name="radio-buttons-group"
      onChange={handleChange}
    >
      {teams.map(team => {
        return <FormControlLabel value={`${teams.id}`} control={<Radio />} label={`${team.city} ${team.name}`} />
      })}
      
      {/* <FormControlLabel value={`${teams[1].id}`} control={<Radio />} label={`${teams[1].city} ${teams[1].name}`} /> */}
      
    </RadioGroup>
  </FormControl>

  )
}

export default HomeTeamRadio;