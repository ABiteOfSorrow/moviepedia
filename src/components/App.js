import ReviewList from "./ReviewList";
import ReviewForm from "./ReviewForm";
import { createReview, getReviews, updateReview, deleteReview } from "../api";
import { useState, useEffect, useCallback } from "react";
import useAsync from "../hooks/useAsync";
import LocaleSelect from "./LocaleSelect";
import useTranslate from '../hooks/useTranslate';
import '../styles/App.css';
import logoImg from '../styles/assets/logo.png';
import ticketImg from '../styles/assets/ticket.png';


const LIMIT = 6;

function AppSortButton({ selected, children, onClick }) {
    return (
      <button
        disabled={selected}
        className={`AppSortButton ${selected ? 'selected' : ''}`}
        onClick={onClick}
      >
        {children}
      </button>
    );
  }

function App() {
    const translate = useTranslate();
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
    const handleLoad = useCallback(async (options) => {
        
        const result = await getReviewsAsync(options);
        if (!result) return;

        const { reviews, paging } = result;
        if (options.offset === 0) {
            setListItems(reviews);
        } else {
            setListItems((prevItems) => [...prevItems, ...reviews]);
        }
        setOffset(options.offset + reviews.length);
        setHasNext(paging.hasNext);

    }, [getReviewsAsync])

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
    }, [order, handleLoad])

  return ( 
    <div className="App">
        <nav className="App-nav">
            <div className="App-nav-container">
                <img className="App-logo" src={logoImg} alt="MOVIDE PEDIA" />
                <LocaleSelect />
            </div>
        </nav>
        <div className="App-container">
            <div className="App-ReviewForm" style={{backgroundImage: `url("${ticketImg}")`,}}>
                <ReviewForm onSubmit={createReview} onSubmitSuccess={handleCreateSuccess}/>
            </div>
            <div className="App-sorts">
                <AppSortButton selected={order === 'createdAt'} onClick={handleNewestClick}>
                    {translate('newest')}
                </AppSortButton>
                <AppSortButton selected={order === 'rating'} onClick={handleBestClick}>
                    {translate('best')}
                </AppSortButton>
            </div>
            <div className="App-ReviewList">
                <ReviewList items={sortedItems} onDelete={handleDelete} onUpdate={updateReview} onUpdateSuccess={handleUpdateSuccess}/>                
                {hasNext ? (<button className="App-load-more-button" disabled={isLoading} onClick={handleLoadMore}>
                                {translate('load more')}
                            </button>) 
                        : (<div className="App-load-more-button" />)}
            {loadingError?.message && <span>{loadingError.message}</span>}
            </div>
        </div>
        <footer className="App-footer">
            <div className="App-footer-container">
                {translate('terms of service')} | {translate('privacy policy')}
            </div>
      </footer>
    </div>
  );
}

export default App;
