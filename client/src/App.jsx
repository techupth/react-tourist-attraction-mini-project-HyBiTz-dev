import "./App.css";
import Travelcontents from "./components/Travelcontents";

function App() {
  return (
    <div className="App flex flex-col justify-center items-center mt-5">
      <h1 className="text-7xl text-sky-500">เที่ยวใหนดี</h1>
      <Travelcontents />
    </div>
  );
}

export default App;
