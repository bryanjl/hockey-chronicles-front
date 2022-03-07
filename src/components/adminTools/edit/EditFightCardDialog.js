import { Button, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, Grid, TextField } from "@material-ui/core";
import PlayerSearch from "../../create/PlayerSearch";
// import GameTimePicker from "../../create/GameTimePicker";


const EditFightCardDialog = ({ fight, open, handleClose }) => {
    console.log(fight);
    //state for form values
    const handlePlayerChange = (newPlayer) => {
        console.log(newPlayer)
    }


  return (
    

    <Dialog open={open} onClose={handleClose}>
        <DialogTitle>Edit Fight Card</DialogTitle>
        <DialogContent>
            <DialogContentText>
            Use this form to edit the details of the fight.
            </DialogContentText>
            <Grid container>
                <Grid item xs={12}>
                    
                </Grid>
                <Grid item sm={6} xs={12}>
                    <PlayerSearch player={fight.players[0]} setFormPlayer={handlePlayerChange} />
                </Grid>
                <Grid item sm={6} xs={12}>
                    <PlayerSearch player={fight.players[1]} setFormPlayer={handlePlayerChange} />        
                </Grid>
            </Grid>
            
            
            <TextField
                margin="dense"
                id="fightDescription"
                label="Description"
                fullWidth
                variant="outlined"
                multiline
                minRows={3}
            />
        </DialogContent>
        <DialogActions>
            <Button onClick={handleClose}>Cancel</Button>
            <Button onClick={handleClose}>Update Fight/Event</Button>
        </DialogActions>
    </Dialog>
    
  )
}

export default EditFightCardDialog;