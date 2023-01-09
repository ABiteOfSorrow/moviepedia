import ReviewList from "./ReviewList";
import MockData from "../mock.json";
import { useState } from "react";

function App() {
    const [order, setOrder] = useState('createdAt');
    const [listItems, setListItems] = useState(MockData);

    const sortedItems = listItems.sort((a, b) => b[order] - a[order]);

    const handleNewestClick = () => setOrder('createdAt');
    const handleBestClick = () => setOrder('rating');
    const handleDelete = (id) => {
        const nextItems = listItems.filter((item) => item.id !== id);
        setListItems(nextItems);
    }

  return (
    <div>
        <div>
            <button onClick={handleNewestClick}>최신순</button>
            <button onClick={handleBestClick}>베스트순</button>
        </div>
        <ReviewList items={sortedItems} onDelete={handleDelete}/>
    </div>
  );
}

export default App;
