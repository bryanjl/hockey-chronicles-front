import { Container, makeStyles, Typography } from "@material-ui/core";
import { useState, useEffect } from "react";
import {
    // getComments as getCommentsApi, 
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


const Comments = ({ model, recordId, comments }) => {
    const classes = useStyles();

    console.log(comments);

    let currentUserId = getUserId();

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
        createCommentApi(model, recordId, text, parentId).then(comment => {
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

    //Get comments from API
    // useEffect(() => {
    //     getCommentsApi(model, recordId).then(data => {
    //         data.sort((a, b) => new Date(a.createdAt).getTime() + new Date(b.createdAt).getTime());
    //         //Not sure why I need to reverse list here??
    //         setBackendComments(data.reverse());
    //     });
    // }, [recordId, model]);

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

export default Comments;
