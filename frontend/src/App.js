import "./App.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { AppContextProvider } from "./context/appContext/AppContext";
import Signin from "./pages/signin/Signin";
import Signup from "./pages/signup/Signup";
import Topbar from "./components/topbar/Topbar";
import PrivateRoute from "./components/routing/PrivateRoute";
import Home from "./pages/home/Home";
import Profile from "./pages/profile/Profile";
import PlaceOrder from "./pages/order/PlaceOrder";
function App() {
  return (
    <AppContextProvider>
      <div className="App">
        <BrowserRouter>
          <Topbar />
          <div className="appWrapper">
            <Routes>
              <Route exact path="/" element={<Home />} />
              <Route exact path="/signin" element={<Signin />} />
              <Route exact path="/signup" element={<Signup />} />
              <Route exact path="/profile" element={<PrivateRoute />}>
                <Route exact path="/profile" element={<Profile />} />
              </Route>
              <Route exact path="/chooseplan" element={<PrivateRoute />}>
                <Route exact path="/chooseplan" element={<PlaceOrder />} />
              </Route>
            </Routes>
          </div>
        </BrowserRouter>
      </div>
    </AppContextProvider>
  );
}

export default App;
