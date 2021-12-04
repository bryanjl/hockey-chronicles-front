
import CommentForm from "./CommentForm";

const Comment = ({ 
    comment, 
    replies, 
    currentUserId, 
    deleteComment, 
    activeComment,
    addComment, 
    setActiveComment, 
    parentId = null,
    updateComment 
}) => {
    const fiveMinutes = 300000; 
    const timePassed = new Date() - new Date(comment.createdAt) > fiveMinutes;
    const canReply = Boolean(currentUserId);
    const canEdit = currentUserId === comment.userId && !timePassed;
    const canDelete = currentUserId === comment.userId && !timePassed;
    const createdAt = new Date(comment.createdAt).toLocaleDateString();
    const isReplying = 
        activeComment && 
        activeComment.type === 'replying' && 
        activeComment.id === comment.id;
    const isEditing = 
        activeComment && 
        activeComment.type === 'editing' && 
        activeComment.id === comment.id;
    const replyId = parentId ? parentId : comment.id
    return (
        <div className='comment'>
            <div className='comment-image-container'>
                <img src='/user-icon.png' alt='user' />
            </div>
            <div className='comment-right-part'>
                <div className='comment-content'>
                    <div className='comment-author'>
                        {comment.username}
                    </div>
                    <div>
                        {createdAt}
                    </div>
                </div>
                {!isEditing && <div className='comment-text'>{comment.body}</div>}
                {isEditing && (
                    <CommentForm 
                        submitLabel='Update' 
                        hasCancelButton 
                        initialText={comment.body} 
                        handleSubmit={(text) => updateComment(text, comment.id)}
                        handleCancel={() => setActiveComment(null)}
                    />
                )}
                <div className='comment-actions'>
                    {canReply && 
                        <div 
                            className='comment-action'
                            onClick={() => setActiveComment({ id: comment.id, type: 'replying' })}
                        >
                            Reply
                        </div>}
                    {canEdit && 
                        <div 
                            className='comment-action'
                            onClick={() => setActiveComment({ id: comment.id, type: 'editing' })}
                        >
                            Edit
                        </div>}
                    {canDelete && <div className='comment-action' onClick={() => deleteComment(comment.id)} >Delete</div>}
                </div>
                {/* if there is reply we recursively call comment components
                there can be no nested replies save on performance*/}
                {isReplying && (
                    <CommentForm
                        submitLabel='Reply'
                        handleSubmit={(text) => addComment(text, replyId)}
                    />
                )}
                {replies.length > 0 && (
                    <div className='replies'>
                        {replies.map(reply => (
                            <Comment 
                                key={reply.id} 
                                comment={reply} 
                                replies={[]}
                                currentUserId={currentUserId}
                                deleteComment={deleteComment}
                                updateComment={updateComment}
                                parentId={comment.id}
                                addComment={addComment}
                                activeComment={activeComment}
                                setActiveComment={setActiveComment}
                            />
                        ))}
                    </div>
                )}
            </div>
        </div>
    )
}

export default Comment
