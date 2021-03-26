import "./App.css";
import Header from "./components/header/header";
import Navbar from "./components/navbar/navbar";
import Profile from "./components/profile/profile";
import Dialogs from "./components/dialogs/dialogs";
import Footer from "./components/footer/footer";
import { BrowserRouter, Route } from "react-router-dom";

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
                addPost={props.addPost}
                changePost={props.changePost}
              />
            )}
          />
          <Route
            path="/dialogs"
            render={() => <Dialogs dialogsPage={props.state.dialogsPage} />}
          />
        </div>

        <Footer />
      </div>
    </BrowserRouter>
  );
}

export default App;
