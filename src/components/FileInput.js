import { useEffect, useRef, useState } from "react";
import placeholderImg from '../styles/assets/preview-placeholder.png';
import resetImg from '../styles/assets/ic-reset.png';
import '../styles/FileInput.css';

function FileInput({ className='', name, value, initialPreview, onChange }) {

    const [preview, setPreview] = useState(initialPreview);
    
    const inputRef = useRef();


    const handleChange = (e) => {
        const nextValue = e.target.files[0];
        onChange(name, nextValue)
    }

    const handleClearClick = () => {
        const inputNode = inputRef.current;
        if (!inputRef) return;

        inputNode.value = '';
        onChange(name, null)
    }

    useEffect(() => {
        
        if (!value) return;
        const nextPreview = URL.createObjectURL(value);
        setPreview(nextPreview);

        return () => {
            setPreview(initialPreview);
            URL.revokeObjectURL(nextPreview);
        }

    }, [value, initialPreview])
    
    return (
        <div className={`FileInput ${className}`}>
            <img className={`FileInput-preview ${preview ? 'selected' : ''}`}         
            src={preview || placeholderImg}
            alt="이미지 미리보기" 
            />

            <input className="FileInput-hidden-overlay"
                   type="file" 
                   accepet="image/png, image/jpeg, image/ico" 
                   onChange={handleChange} ref={inputRef} />
                   {value && 
                        <button className="FileInput-clear-button" onClick={handleClearClick}>
                            <img src={resetImg} alt="선택해제"/>
                        </button>}
        </div>
    )
}

export default FileInput;