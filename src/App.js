import "./App.css";
import HeaderContainer from "./components/header/HeaderContainer";
import Navbar from "./components/navbar/navbar";
import Profile from "./components/profile/profile";
import Footer from "./components/footer/footer";
import { BrowserRouter, Route } from "react-router-dom";
import DialogsContainer from "./components/dialogs/dialogsContainer";
import UsersContainer from "./components/users/usersContainer";

function App(props) {
  return (
    <BrowserRouter>
      <div className="App">
        <HeaderContainer />
        <Navbar />
        <div className="content-wrapper">
          <Route path="/profile/:userId?" render={() => <Profile />} />
          <Route path="/dialogs" render={() => <DialogsContainer />} />
          <Route path="/users" render={() => <UsersContainer />} />
        </div>

        <Footer />
      </div>
    </BrowserRouter>
  );
}

export default App;
