import "./App.css";
import { Routes, Route, Link } from "react-router-dom";

import Home from './pages/Home';

function App() {
  return (
    <div className="App">
      <nav>
        <ul>
          <li>
            {/* <Link to="/">Characters</Link> */}
          </li>
          <li>
            {/* <Link to="/quotes">Quotes</Link> */}
          </li>
        </ul>
      </nav>

      <Routes>
        <Route path="/" element={<Home />} />
        {/* <Route path="/char/:char_id" element={<Detail />} />
        <Route path="/quotes" element={<Quotes />} />
        <Route path="/quotes/:quotes_id" element={<QuoteDetail />} /> */}
      </Routes>
    </div>
  );
}

export default App;