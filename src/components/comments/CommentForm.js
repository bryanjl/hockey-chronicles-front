import { useState } from "react"


const CommentForm = ({ 
    handleSubmit, 
    submitLabel, 
    hasCancelButton = false, 
    initialText = '', 
    handleCancel 
}) => {
    const [text, settext] = useState(initialText);
    const isTextareaDisabled = text.length === 0;

    const onSubmit = event => {
        event.preventDefault();
        handleSubmit(text);
        settext('');    
    }

    return (
        <form onSubmit={onSubmit}>
            <textarea 
                className='comment-form-textarea' 
                value={text} 
                onChange={(e) => settext(e.target.value)} 
            />
            <button className='comment-form-button' disabled={isTextareaDisabled} >{submitLabel}</button>
            {hasCancelButton && (
                <button 
                    type='button'
                    className='comment-form-button comment-form-cancel-button'
                    onClick={handleCancel}
                >
                    Cancel
                </button>
            )}
        </form>
    )
}

export default CommentForm
