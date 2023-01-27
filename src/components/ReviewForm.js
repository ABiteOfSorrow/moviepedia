import { useState } from "react"
import { createReviews } from "../api";
import FileInput from "./FileInput";
import RatingInput from "./RatingInput";
import './styles/ReviewForm.css';

const INITIAL_VALUES = {
    title: '',
    rating: 0,
    content: '',
    imgFile: null,
}

function ReviewForm({initialValues = INITIAL_VALUES, initialPreview, onSubmitSuccess, onCancel}) {

    const [values, setValues] = useState(initialValues);
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [submittingError, setSubmittingError] = useState(null);

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
        let result;
        try {
            setSubmittingError(null);
            setIsSubmitting(true);
            await createReviews(formData);
        } catch (error) {
            setSubmittingError(error);
            return;
        } finally {
            setIsSubmitting(false);
        }
        const { review } = result;
        setValues(INITIAL_VALUES);
        onSubmitSuccess(review);
    }

    return (
        <form className="ReviewForm" onSubmit={handleSubmit}>
            <FileInput name="imgFile" value={values.imgFile} initialPreview={initialPreview} onChange={handleChange} />
            <input name="title" value={values.title} onChange={handleInputChange} />
            <RatingInput name="rating" type="number" value={values.rating} onChange={handleChange} />
            <textarea name="content" value={values.content} onChange={handleInputChange} />
            <button type="submit" disabled={isSubmitting}>확인</button>
            {onCancel && <button onClick={onCancel}>취소</button>}
            {submittingError?.message && <div>{submittingError.message}</div>}
        </form>
    )
}

export default ReviewForm;