import ReviewList from "./ReviewList";
import ReviewForm from "./ReviewForm";
import { createReview, getReviews, updateReview, deleteReview } from "../api";
import { useState, useEffect } from "react";
import useAsync from "../hooks/useAsync";

const LIMIT = 6;

function App() {

    const [order, setOrder] = useState('createdAt');
    const [listItems, setListItems] = useState([]);
    const [offset, setOffset] = useState(0);
    const [hasNext, setHasNext] = useState(false);
    const [isLoading, loadingError, getReviewsAsync] = useAsync(getReviews);

    const sortedItems = listItems.sort((a, b) => b[order] - a[order]);

    // Sort items
    const handleNewestClick = () => setOrder('createdAt');
    const handleBestClick = () => setOrder('rating');

    // Delete item
    const handleDelete = async (id) => {
        
        const result = await deleteReview(id);
        if(!result) return;

        setListItems((prevItems) => prevItems.filter((item) => item.id !== id));
    }

    // Load items
    const handleLoad = async (options) => {
        
        const result = await getReviewsAsync(options);
        if (!result) return;

        const { reviews, paging } = result;
        if (options.offset === 0){
            setListItems(reviews);
        } else {
            setListItems((prevItems) => [...prevItems, ...reviews]);
        }
        setOffset(options.offset + reviews.length);
        setHasNext(paging.hasNext);

    }

    // Load more items
    const handleLoadMore = async () => {
        handleLoad({order, offset, limit: LIMIT});
    }

    // Create review
    const handleCreateSuccess = (review) => {
        handleLoad({order, offset: 0, limit: LIMIT});
    }

    // Upadte review
    const handleUpdateSuccess = (review) => {
          setListItems((prevItems) => {
            const splitIdx = prevItems.findIndex((item) => item.id === review.id);
            return [
                ...prevItems.slice(0, splitIdx),
                review,
                ...prevItems.slice(splitIdx + 1),
            ]
        }) 
    }

    // Load items (default)
    useEffect(() => {
        handleLoad({order, offset: 0, limit: LIMIT});
    }, [order])

  return (
    <div>
        <div>
            <button onClick={handleNewestClick}>최신순</button>
            <button onClick={handleBestClick}>베스트순</button>
        </div>
        <ReviewForm onSubmit={createReview} onSubmitSuccess={handleCreateSuccess}/>
        <ReviewList items={sortedItems} onDelete={handleDelete} onUpdate={updateReview} onUpdateSuccess={handleUpdateSuccess}/>
        {hasNext && (<button disabled={isLoading} onClick={handleLoadMore}>더보기</button>)}
        {loadingError?.message && <span>{loadingError.message}</span>}
    </div>
  );
}

export default App;
