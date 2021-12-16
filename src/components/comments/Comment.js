import { Avatar, Divider, Grid, makeStyles, Paper, Typography } from "@material-ui/core";
import CommentForm from "./CommentForm";

const useStyles = makeStyles((theme) => ({
    commentPaper: {
        width: '95%',
        padding: '10px',
        // marginTop: '5px',
        [theme.breakpoints.up('md')]: {
            width: '100%'
        },
        borderRadius: '0'
    },
    commentAuthor: {
        marginRight: '8px',
        fontSize: '20px',
        color: 'rgb(59, 130, 246)'
    },
    commentBody: {
        fontSize: '18px',
        overflowWrap: 'break-word'
    },
    rightAlign: {
        textAlign: 'right',
        marginRight: '10px'
    },
    commentActions: {
        display: 'flex',
        cursor: 'pointer',
        marginTop: '8px'
    },
    commentAction: {
        marginRight: '5px',
        color: 'rgb(51, 51, 51)',
        fontSize: '12px',
    },
    replies: {
        width: '100%'
    },
    commentAvatar: {
        marginRight: '10px'
    }
}));

const Comment = ({ 
    comment, 
    replies, 
    currentUserId, 
    deleteComment, 
    activeComment,
    addComment, 
    setActiveComment, 
    parentId = null,
    updateComment,
    isReply = false 
}) => {
    const classes = useStyles();

    // console.log('reply', replies);
    // console.log('commentttt', comment);
    // console.log(new Date(comment.createdAt))
    console.log(currentUserId, comment.userId);

    const fiveMinutes = 30000000; 
    const timePassed = new Date() - new Date(comment.createdAt) > fiveMinutes;
    console.log(new Date() - new Date(comment.createdAt));
    const canReply = Boolean(currentUserId);
    const canEdit = currentUserId === comment.userId && !timePassed;
    const canDelete = currentUserId === comment.userId && !timePassed;
    const createdAt = new Date(comment.createdAt).toLocaleDateString();
    const isReplying = 
        activeComment && 
        activeComment.type === 'replying' && 
        activeComment._id === comment._id;
    const isEditing = 
        activeComment && 
        activeComment.type === 'editing' && 
        activeComment._id === comment._id;
    const replyId = parentId ? parentId : comment._id

    const imgSrc = './user-icon.png';

    return (
        <Paper className={classes.commentPaper} elevation={0}>
            <Grid container wrap='nowrap' spacing={0}> 
                <Grid item>
                    <Avatar className={classes.commentAvatar} alt='user' src={imgSrc} />
                </Grid>
                <Grid item zeroMinWidth>
                    <Grid container>
                        <Grid item> 
                            <Typography className={classes.commentAuthor}>
                                {comment.username}
                            </Typography>
                        </Grid>
                        <Grid item> 
                            <Typography >
                                {createdAt}
                            </Typography>
                        </Grid>
                        
                    </Grid>
                    {!isEditing && <Typography className={classes.commentBody}>{comment.body}</Typography>}
                    {isEditing && (
                        <CommentForm 
                            submitLabel='Update' 
                            hasCancelButton 
                            initialText={comment.body} 
                            handleSubmit={(text) => updateComment(text, comment._id)}
                            handleCancel={() => setActiveComment(null)}
                        />
                    )}
                    <div className={classes.commentActions}>
                        {canReply && 
                            <Typography 
                                className={classes.commentAction}
                                onClick={() => setActiveComment({ id: comment._id, type: 'replying' })}
                            >
                                Reply
                            </Typography>}
                        {canEdit && 
                            <Typography 
                                className={classes.commentAction}
                                onClick={() => setActiveComment({ id: comment._id, type: 'editing' })}
                            >
                                Edit
                            </Typography>}
                        {canDelete && 
                            <Typography 
                                className={classes.commentAction} 
                                onClick={() => deleteComment(comment._id)} 
                            >
                                Delete
                            </Typography>}
                    </div>
                    {/* if there is reply we recursively call comment components
                    there can be no nested replies save on performance*/}
                    {isReplying && (
                        <CommentForm
                            submitLabel='Reply'
                            handleSubmit={(text) => addComment(text, replyId)}
                            hasCancelButton
                            handleCancel={() => setActiveComment(null)}
                        />
                    )}
                    {replies.length > 0 && (
                        <div className={classes.replies}>
                            {replies.map(reply => (
                                <Comment 
                                    key={reply._id} 
                                    comment={reply} 
                                    replies={[]}
                                    currentUserId={currentUserId}
                                    deleteComment={deleteComment}
                                    updateComment={updateComment}
                                    parentId={comment._id}
                                    addComment={addComment}
                                    activeComment={activeComment}
                                    setActiveComment={setActiveComment}
                                    isReply={true}
                                />
                            ))}
                        </div>
                    )}
                </Grid>
            </Grid>
            {!isReply && 
                <Divider variant='fullWidth' />
            }
            
        </Paper>
    )
}

export default Comment
