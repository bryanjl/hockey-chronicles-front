import { useState } from "react";
import { Button, Grid, makeStyles, TextField } from "@material-ui/core";

const useStyles = makeStyles((theme) => ({
    button: {
        marginRight: '5px',
        marginTop: '5px'
    },
    textfield: {
        width: '95%',
        backgroundColor: 'white',
        [theme.breakpoints.up('md')]: {
            width: '100%'
        }
    }
}));



const CommentForm = ({ 
    handleSubmit, 
    submitLabel, 
    hasCancelButton = false, 
    initialText = '', 
    handleCancel 
}) => {
    const classes = useStyles();

    const [text, setText] = useState(initialText);
    const isTextareaDisabled = text.length === 0;

    const onSubmit = event => {
        event.preventDefault();
        handleSubmit(text);
        setText('');    
    }

    return (
        <form onSubmit={onSubmit}>
            <Grid container>
                <Grid item xs={12}>
                    <TextField 
                        className={classes.textfield} 
                        variant='filled' 
                        value={text} 
                        onChange={(e) => setText(e.target.value)}
                        multiline
                        rows={5}
                        placeholder='Write your comment...'
                    />
                </Grid>
                <Grid item xs={12}>
                    <Button 
                        className={classes.button}
                        type='submit' 
                        variant='contained'  
                        disabled={isTextareaDisabled}
                    >
                        {submitLabel} 
                    </Button>
                    {hasCancelButton && (
                        <Button 
                            className={classes.button}
                            variant='contained'
                            onClick={handleCancel}
                        >
                            Cancel
                        </Button>
                    )}
                </Grid>
            </Grid>   
        </form>
    )
}

export default CommentForm;


