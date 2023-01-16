import { useState } from "react"
import "./ReviewForm.css";

function ReviewForm() {

    const [values, setValues] = useState({
        title: '',
        rating: 0,
        content: '',
    });

    const handleChange = (e) => {
        const { name, value} = e.target;
        setValues((preValues) => ({
            ...preValues, [name]: value,
       })
    )}

    // Submit state 
    const handleSubmit = (e) => {
        // prevent default get request of html form tag
        e.preventDefault();
        console.log({values})
    }

    return (
        <form className="ReviewForm" onSubmit={handleSubmit}>
            <input name="title" value={values.title} onChange={handleChange} />
            <input name="rating" type="number" value={values.rating} onChange={handleChange} />
            <textarea namte="content" value={values.content} onChange={handleChange} />
            <button type="submit">확인</button>
        </form>
    )
}

export default ReviewForm;