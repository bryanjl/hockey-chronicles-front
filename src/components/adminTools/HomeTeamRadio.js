import Radio from '@mui/material/Radio';
import RadioGroup from '@mui/material/RadioGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import FormControl from '@mui/material/FormControl';
import FormLabel from '@mui/material/FormLabel';

const HomeTeamRadio = ({ homeTeam, teams, updateHomeTeam }) => {
    const handleChange = (e) => {
        // console.log(e.target.value);
        updateHomeTeam(e.target.value);
    }

  return (
    <FormControl>
    <FormLabel id='home-team-radio-group'>Choose Home Team</FormLabel>
    <RadioGroup
      aria-labelledby='home-team-radio-group'
      defaultValue={homeTeam}
      name="radio-buttons-group"
      onChange={handleChange}
    >
      {/* {teams.map(team => {
        return <FormControlLabel value={`${teams.id}`} control={<Radio />} label={`${team.city} ${team.name}`} />
      })} */}
      
      <FormControlLabel value={`${teams[0].id}`} control={<Radio />} label={`${teams[0].city} ${teams[0].name}`} />
      <FormControlLabel value={`${teams[1].id}`} control={<Radio />} label={`${teams[1].city} ${teams[1].name}`} />

      {/* <FormControlLabel value={`${teams[1].id}`} control={<Radio />11} label={`${teams[1].city} ${teams[1].name}`} /> */}
      
    </RadioGroup>
  </FormControl>

  )
}

export default HomeTeamRadio;