import logo from "./logo.svg";
import "./App.css";
import Header from "./components/header/header";
import Navbar from "./components/navbar/navbar";
import Profile from "./components/profile/profile";
import Footer from "./components/footer/footer";

function App() {
  return (
    <div className="App">
      <Header />
      <Navbar />
      <Profile />
      <Footer />
    </div>
  );
}

export default App;
