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

  return (
    <FormControl component="fieldset">
    <FormLabel component="legend">Choose Home Team</FormLabel>
    <RadioGroup
      aria-label="home-team"
      defaultValue={teams[0].home ? teams[0].id : teams[1].id}
      name="radio-buttons-group"
      onChange={handleChange}
    >
      <FormControlLabel value={`${teams[0].id}`} control={<Radio />} label={`${teams[0].city} ${teams[0].name}`} />
      <FormControlLabel value={`${teams[1].id}`} control={<Radio />} label={`${teams[1].city} ${teams[1].name}`} />
      
    </RadioGroup>
  </FormControl>

  )
}

export default HomeTeamRadio;