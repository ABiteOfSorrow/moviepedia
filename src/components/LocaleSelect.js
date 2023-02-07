import { useLocale, useSetLocale } from "../contexts/LocaleContext";
import "../styles/LocaleSelect.css"

function LocaleSelect() {
    
    const locale = useLocale();
    const setLocale = useSetLocale();

    const handleChange = (e) => setLocale(e.target.value);

    return (
        <div className="selector">
        <select value={locale} onChange={handleChange}>
            <option value="fr">Français</option>
            <option value="ko">한국어</option>            
            <option value="en">English</option>
        </select>
        </div>
    )
}

export default LocaleSelect;