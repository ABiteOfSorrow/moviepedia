import { useState } from "react"
import useAsync from "../hooks/useAsync";
import useTranslate from "../hooks/useTranslate";
import FileInput from "./FileInput";
import RatingInput from "./RatingInput";
import '../styles/ReviewForm.css';


const INITIAL_VALUES = {
    title: '',
    rating: 0,
    content: '',
    imgFile: null,
}

function ReviewForm({
    className = '', initialValues = INITIAL_VALUES, initialPreview, onSubmit, onSubmitSuccess, onCancel}) {
    
    const translate = useTranslate();
    const [values, setValues] = useState(initialValues);
    const [isSubmitting, submittingError, onSubmitAsync] = useAsync(onSubmit);

    const handleChange = (name, value) => {
        setValues((preValues) => ({
            ...preValues, [name]: value,
       }));
    }
    
    const handleInputChange = (e) => {
        const { name, value } = e.target;
        handleChange( name, value );
    }
    

    // Submit state 
    const handleSubmit = async (e) => {
        // prevent default get request of html form tag
        e.preventDefault();
        const formData = new FormData();
        formData.append('title', values.title);
        formData.append('rating', values.rating);
        formData.append('content', values.content);
        formData.append('imgFile', values.imgFile);

        const result = await onSubmitAsync(formData);
        if (!result) return;
        
        const { review } = result;
        setValues(INITIAL_VALUES);
        onSubmitSuccess(review);
    }

    
    return (
        <form className={`ReviewForm ${className}`} onSubmit={handleSubmit}>
            <FileInput className="ReviewForm-preview" name="imgFile" value={values.imgFile} initialPreview={initialPreview} onChange={handleChange} />
            <div className="ReviewForm-rows">
                <div className="ReviewForm-title-rating">
                    <input className="ReviewForm-title" name="title" value={values.title} onChange={handleInputChange} placeholder={translate('title placeholder')}/>
                    <RatingInput className="ReviewForm-rating" name="rating" type="number" value={values.rating} onChange={handleChange} />
                </div>
                <textarea className="ReviewForm-content" name="content" value={values.content} onChange={handleInputChange} placeholder={translate('content placeholder')}/>
                <div className="ReviewForm-error-buttons">
                    <div className="ReviewForm-error">
                        {submittingError?.message && <div>{submittingError.message}</div>}
                    </div>
                    <div className="ReviewForm-buttons">
                        {onCancel && <button className="ReviewForm-cancel-button" onClick={onCancel}>{translate('cancel button')}</button>}
                        <button className="ReviewForm-submit-button" type="submit" disabled={isSubmitting}>{translate('confirm button')}</button>            
                    </div>
                </div>
            </div>
        </form>
    )
}

export default ReviewForm;