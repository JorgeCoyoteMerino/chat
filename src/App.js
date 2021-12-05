import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router} from 'react-router-dom';
import CssBaseline from '@material-ui/core/CssBaseline';
import Header from './Components/Layout/Header';
import User from './Components/User';
import Routes from './Routes';
import { ThemeProvider } from "@material-ui/styles";
import { createMuiTheme } from "@material-ui/core";
import { blue, pink } from "@material-ui/core/colors";
import { getAuth,  } from "firebase/auth";
import { loadUser } from './Components/Utils/dbUtils';



 const theme = createMuiTheme({
  papette: {
   primary: { main: blue[700] },
},
secondary: pink,
}); 

function App() {
  const auth = getAuth();
  const [user, setUser] = useState(null);

  const onLogout = () => {
    setUser(null);
  };

  useEffect(() => {
    auth.onAuthStateChanged(response => {
      if (response) {
        // leer datos del usuario
        loadUser(response.uid)
        .then(data => { setUser(data); });
      }
    });
  }, []); 

  return (
    <ThemeProvider theme={theme}>
      <Router>
        <CssBaseline />
        <Header>
          {user && <User user={user} onLogout={onLogout} />}
        </Header>
        <Routes />
      </Router>
    </ThemeProvider>
  );
}

export default App;