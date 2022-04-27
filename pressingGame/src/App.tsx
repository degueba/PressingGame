import "./App.scss";
import { startConnection } from "./config/connection";

function App() {
  return (
    <div className="pressinggame">
      <div className="pressinggame__content">
        <a className="pressinggame__logo">
          <small>Pressing game by</small>
          <img
            src={"https://www.oneof.com/wp-content/uploads/2022/03/ONO.svg"}
            width={100}
            height={100}
          />
        </a>
        <button
          className="pressinggame__button"
          onClick={() => startConnection()}
        >
          Press Button
        </button>
      </div>
    </div>
  );
}

export default App;
