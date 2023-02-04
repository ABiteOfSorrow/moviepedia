import { useState } from "react"
import FileInput from "./FileInput";
import useAsync from "../hooks/useAsync";
import RatingInput from "./RatingInput";
import './styles/ReviewForm.css';

const INITIAL_VALUES = {
    title: '',
    rating: 0,
    content: '',
    imgFile: null,
}

function ReviewForm({
    initialValues = INITIAL_VALUES, initialPreview, onSubmit, onSubmitSuccess, onCancel}) {

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
        onSubmitSuccess(review);
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