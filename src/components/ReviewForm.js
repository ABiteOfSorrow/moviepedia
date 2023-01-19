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

function ReviewForm() {

    const [values, setValues] = useState(INITIAL_VALUES);
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
        
        setValues(INITIAL_VALUES);
    }

    return (
        <form className="ReviewForm" onSubmit={handleSubmit}>
            <FileInput name="imgFile" value={values.imgFile} onChange={handleChange} />
            <input name="title" value={values.title} onChange={handleInputChange} />
            <RatingInput name="rating" type="number" value={values.rating} onChange={handleChange} />
            <textarea name="content" value={values.content} onChange={handleInputChange} />
            <button type="submit" disabled={isSubmitting}>확인</button>
            {submittingError?.message && <div>{submittingError.message}</div>}
        </form>
    )
}

export default ReviewForm;