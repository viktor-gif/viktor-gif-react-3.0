import "./App.css";
import Header from "./components/header/header";
import Navbar from "./components/navbar/navbar";
import Profile from "./components/profile/profile";
import Footer from "./components/footer/footer";
import { BrowserRouter, Route } from "react-router-dom";
import DialogsContainer from "./components/dialogs/dialogsContainer";

function App(props) {
  return (
    <BrowserRouter>
      <div className="App">
        <Header />
        <Navbar />
        <div className="content-wrapper">
          <Route
            path="/profile"
            render={() => (
              <Profile
                profilePage={props.state.profilePage}
                dispatch={props.dispatch}
              />
            )}
          />
          <Route
            path="/dialogs"
            render={() => (
              <DialogsContainer
                dialogsPage={props.state.dialogsPage}
                dispatch={props.dispatch}
              />
            )}
          />
        </div>

        <Footer />
      </div>
    </BrowserRouter>
  );
}

export default App;
