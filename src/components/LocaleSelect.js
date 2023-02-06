import { useLocale, useSetLocale } from "../contexts/LocaleContext";

function LocaleSelect() {
    const locale = useLocale();
    const setLocale = useSetLocale();

    const handleChange = (e) => setLocale(e.target.value);

    return (
        <select value={locale} onChange={handleChange}>
            <option value="fr">Français</option>
            <option value="ko">한국어</option>            
        </select>
    )
}

export default LocaleSelect;