import { Container, Grid, makeStyles, Typography } from "@material-ui/core";
import { useState, useEffect, useContext } from "react";
import { UserContext } from "../../contexts/UserContext";
import {
    // getComments as getCommentsApi, 
    postComment as createCommentApi, 
    deleteComment as deleteCommentApi,
    updateComment as updateCommentApi
} from '../../api/comments/commentsApi';
// import { getUserId } from "../../api/auth/authApi";
import Comment from './Comment';
import CommentForm from "./CommentForm";
import './comments.css';


const useStyles = makeStyles((theme) => ({
    comments: {
        display: 'flex',
        justifyItems: 'center',
        minWidth: '100%',
        // border: '1px solid black',
        // [theme.breakpoints.down('md')]:{
        //     width: '100%'
        // }        
    },
    commentTitle: {
        marginBottom: '10px'
    },
    formTitle: {
        marginBottom: '5px'
    }
}));


const Comments = ({ model, recordId, comments }) => {
    const classes = useStyles();
    const { user } = useContext(UserContext);

    // console.log(user);

    let currentUserId = ''
    if(user) {
        currentUserId = user._id;
    }
    

    //state of comments
    const [backendComments, setBackendComments] = useState([]);
    const [activeComment, setActiveComment] = useState(null);

    const rootComments = backendComments.filter((backendComment) => backendComment.parentId === null );

    //get replies belonging to parentId and Sort in ascending(new to old)
    const getReplies = commentId => {
        return backendComments
            .filter(backendComment => backendComment.parentId === commentId)
            .sort((a, b) => new Date(a.createdAt).getTime() - new Date(b.createdAt).getTime());
    }

    const addComment = (text, parentId) => {
        createCommentApi(user, model, recordId, text, parentId).then(comment => {
            setBackendComments(() => {
                let newComments = [...backendComments, comment];
                setBackendComments(newComments);
                setActiveComment(null);
            });    
        });
        
    }

    const deleteComment = (commentId) => {
        if(window.confirm('Are you sure you want remove comment')) {
            deleteCommentApi(model, recordId, commentId)
            const updatedBackendComments = backendComments.filter(
                (backendComment) => backendComment._id !== commentId);
            setBackendComments(updatedBackendComments);
        }
    }

    const updateComment = (text, commentId) => {
        updateCommentApi(model, recordId, text, commentId)
        
        
        const updatedBackendComments = backendComments.map((backendComment) => {
            if(backendComment._id === commentId) {
                return { ...backendComment, body: text };
            }
            return backendComment;
        })
        
        setBackendComments(updatedBackendComments);
        setActiveComment(null);
        
    }

    useEffect(() => {
        comments.sort((a, b) => new Date(a.createdAt).getTime() + new Date(b.createdAt).getTime());
        setBackendComments(comments);
    }, [comments]);

    //reply comments doesn't scale to large amount of replies
    //okay for small/med project
    return (
        <Container className={classes.comments} >
            <Grid container>
                <Grid item xs={12}>
                    <Typography variant='h4' className={classes.commentTitle}> Comments </Typography>
                </Grid>

                <Grid item xs={12}>
                    {!user && 
                        <>
                            <Typography>Please login to add a comment</Typography>
                        </>
                    }

                    {user && 
                        <>
                            <Typography variant='h5' className={classes.formTitle}>Write comment</Typography>
                            <CommentForm submitLabel='Write' handleSubmit={addComment}  />
                        </>
                    }
                </Grid>

                <Grid item xs={12}>
                    {rootComments.map((rootComment) => (
                        <Comment 
                            key={rootComment._id} 
                            comment={rootComment} 
                            replies={getReplies(rootComment._id)}
                            currentUserId={currentUserId}
                            deleteComment={deleteComment}
                            activeComment={activeComment}
                            setActiveComment={setActiveComment}
                            addComment={addComment}
                            updateComment={updateComment}
                        />
                    ))}
                </Grid>
            </Grid>
        </Container>
    )
}

export default Comments;
