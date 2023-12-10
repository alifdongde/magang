import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import Login from "./components/Login";
import Admin from "./components/Admin";
import Sidenav from "./components/Sidenav";
import TambahData from "./components/TambahData";
import PropagateLoader from "react-spinners/PropagateLoader";
import { useState, useEffect } from "react";
import React from "react";
import FileUploaded from "./components/FileUploaded";
import RenameFolder from "./components/RenameFolder";
import UpdateData from "./components/UpdateData";
import Protected from "./utils/Protected";
import Proteksi from "./utils/Proteksi";
import Dashboard  from './components/dashboard'

export const MyAppContext = React.createContext();

const App = () => {
  const [Isauthenticated, setAuthenticated] = useState(null);

  const isLoggedIn = localStorage.getItem("isLoggedIn");
  const isLogin = localStorage.getItem("isLogin");

  const [loading, setLoading] = useState(false);
  useEffect(() => {
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
    }, 1000);
  }, []);

  useEffect(() => {
    console.log(Isauthenticated);
  }, [Isauthenticated]);

  return (
    <MyAppContext.Provider value={{ Isauthenticated, setAuthenticated }}>
      <div className="App">
        {loading ? (
          <PropagateLoader
            loading={loading}
            color="aqua"
            size={15}
            cssOverride={{
              alignItems: "center",
              backgroundColor: "grey",
              display: "flex",
              height: "100vh",
              justifyContent: "center",
              textAlign: "center",
              width: "100%",
            }}
            margin={2}
            aria-label="Loading Spinner"
            data-testid="loader"
          />
        ) : (
          <div>
            <Router>
              <Routes>
                <Route path="/" element={<Login />} />

                <Route
                  path="/admin"
                  element={
                    <Protected isLoggedIn={isLoggedIn}>
                      <Admin />
                    </Protected>
                  }
                />
                <Route
                  path="/menu"
                  element={
                    <Proteksi isLogin={isLogin}>
                      <Sidenav />
                    </Proteksi>
                  }
                />
                 <Route path="/dashboard/:option" element={<Dashboard />} />
              

                <Route
                  path="/uploadFile/:folderId/"
                  element={<FileUploaded />}
                />
                <Route
                  path="/renameFolder/:folderId"
                  element={<RenameFolder />}
                />
                <Route path="/addData" element={<TambahData />} />
                <Route path="/UpdateData/:id" element={<UpdateData />} />

              </Routes>
            </Router>
          </div>
        )}
      </div>
    </MyAppContext.Provider>
  );
};

export default App;
