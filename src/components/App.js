import ReviewList from "./ReviewList";
import MockData from "../mock.json";

function App() {
  return (
    <div>
        <ReviewList items={MockData}/>
    </div>
  );
}

export default App;
