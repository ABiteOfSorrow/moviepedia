import { useState } from "react"
import FileInput from "./FileInput";
import "./ReviewForm.css";

function ReviewForm() {

    const [values, setValues] = useState({
        title: '',
        rating: 0,
        content: '',
        imgFile: null,
    });
    
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
    const handleSubmit = (e) => {
        // prevent default get request of html form tag
        e.preventDefault();
        console.log({values})
    }

    return (
        <form className="ReviewForm" onSubmit={handleSubmit}>
            <FileInput name="imgFile" value={values.imgFile} onChange={handleChange} />
            <input name="title" value={values.title} onChange={handleInputChange} />
            <input name="rating" type="number" value={values.rating} onChange={handleInputChange} />
            <textarea namte="content" value={values.content} onChange={handleInputChange} />
            <button type="submit">확인</button>
        </form>
    )
}

export default ReviewForm;