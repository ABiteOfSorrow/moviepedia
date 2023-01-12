import ReviewList from "./ReviewList";
import getReviews from "../api";
import { useState, useEffect } from "react";

const LIMIT = 6;

function App() {

    const [order, setOrder] = useState('createdAt');
    const [listItems, setListItems] = useState([]);
    const [offset, setOffset] = useState(0);
    const [hasNext, setHasNext] = useState(false);

    const sortedItems = listItems.sort((a, b) => b[order] - a[order]);

    // Sort items
    const handleNewestClick = () => setOrder('createdAt');
    const handleBestClick = () => setOrder('rating');

    // Delete item
    const handleDelete = (id) => {
        const nextItems = listItems.filter((item) => item.id !== id);
        setListItems(nextItems);
    }

    // Load items
    const handleLoadClick = async (options) => {
        const { reviews, paging } = await getReviews(options);
        if (options.offset === 0){
            setListItems(reviews);
        } else {
            setListItems([...listItems, ...reviews]);
        }
        setOffset(options.offset + reviews.length);
        setHasNext(paging.hasNext);
    }

    // Load more items
    const handleLoadMore = async () => {
        handleLoadClick({order, offset, limit: LIMIT});
    }

    // Load items (default)
    useEffect(() => {
        handleLoadClick({order, offset: 0, limit: LIMIT});
    }, [order])

  return (
    <div>
        <div>
            <button onClick={handleNewestClick}>최신순</button>
            <button onClick={handleBestClick}>베스트순</button>
        </div>
        <ReviewList items={sortedItems} onDelete={handleDelete}/>
        <button onClick={handleLoadClick}>불러오기</button>
        {hasNext && <button onClick={handleLoadMore}>더보기</button>}
    </div>
  );
}

export default App;
