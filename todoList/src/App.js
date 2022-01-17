import logo from "./logo.svg";
import "./App.css";
import Header from "./components/Header/Header.js";
import HomeComponent from "./components/Home/HomeComponent.js";

function App() {
  return (
    <div className="App">
      <Header></Header>
      <HomeComponent></HomeComponent>
    </div>
  );
}

export default App;
