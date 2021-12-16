import { Container, makeStyles, Typography } from "@material-ui/core";
import { useState, useEffect } from "react";
import {
    getComments as getCommentsApi, 
    postComment as createCommentApi, 
    deleteComment as deleteCommentApi,
    updateComment as updateCommentApi
} from '../../api/comments/commentsApi';
import { getUserId } from "../../api/auth/authApi";
import Comment from './Comment';
import CommentForm from "./CommentForm";
import './comments.css';


const useStyles = makeStyles((theme) => ({
    comments: {
        justifyItems: 'center',
        // border: '1px solid black',
        width: '75%',
        [theme.breakpoints.down('md')]:{
            width: '100%'
        }        
    },
    commentTitle: {
        marginBottom: '10px'
    },
    formTitle: {
        marginBottom: '5px'
    }
}));


const Comments = ({ fightId }) => {
    const classes = useStyles();

    let currentUserId = getUserId();

    //state of comments
    const [backendComments, setBackendComments] = useState([]);
    const [activeComment, setActiveComment] = useState(null);

    let rootComments = backendComments.filter((backendComment) => backendComment.parentId === null );
    
    // console.log(rootComments);

    //get replies belonging to parentId and Sort in ascending(new to old)
    const getReplies = commentId => {
        return backendComments
            .filter(backendComment => backendComment.parentId === commentId)
            .sort((a, b) => new Date(a.createdAt).getTime() - new Date(b.createdAt).getTime());
    }

    const addComment = (text, parentId) => {
        let newComments;
        createCommentApi(fightId, text, parentId).then(comment => {
            console.log('comment', comment);
            setBackendComments(() => {
                setActiveComment(null);
                newComments = [comment, ...backendComments]
                setBackendComments(newComments);
                
                // console.log('added', backendComments)
            });    
            
            
            // rootComments = backendComments.filter((backendComment) => backendComment.parentId === null );
        });
        
    }

    const deleteComment = (commentId) => {
        if(window.confirm('Are you sure you want remove comment')) {
            deleteCommentApi(commentId).then(() => {
                const updatedBackendComments = backendComments.filter(
                    (backendComment) => backendComment.id !== commentId
                );
                setBackendComments(updatedBackendComments);
            });
        }
    }

    const updateComment = (text, commentId) => {
        updateCommentApi(text, commentId).then(() => {
            const updatedBackendComments = backendComments.map((backendComment) => {
                if(backendComment.id === commentId) {
                    return { ...backendComment, body: text };
                }
                return backendComment;
            });
            setBackendComments(updatedBackendComments);
            setActiveComment(null);
        });
    }

    //Get comments from API
    useEffect(() => {

        getCommentsApi(fightId).then(data => {
            data.sort((a, b) => new Date(a.createdAt).getTime() + new Date(b.createdAt).getTime());
            setBackendComments(data.reverse());
        });

        // setBackendComments(comments);
        // console.log('hello');
        // getCommentsApi().then(data => {
        //     setBackendComments(data);
        // });
    }, [fightId]);

    //reply comments doesn't scale to large amount of replies
    //okay for small/med project
    return (
        <Container className={classes.comments} >
            <Typography variant='h4' className={classes.commentTitle}> Comments </Typography>
            <Typography variant='h5' className={classes.formTitle}>Write comment</Typography>
            <CommentForm submitLabel='Write' handleSubmit={addComment}  />
            <div className='comments-container'>
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
            </div>
        </Container>
    )
}

export default Comments
