import React, { useState } from 'react';
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import TextField from '@material-ui/core/TextField';
import Link from '@material-ui/core/Link';
import { Link as RouterLink, withRouter } from 'react-router-dom';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import { getAuth, createUserWithEmailAndPassword } from "firebase/auth";
import { ref, set } from 'firebase/database';
import database from './firebaseConfig';
import Alert from './Alert';

const MyLink = React.forwardRef((props, ref) => <RouterLink innerRef={ref} {...props} />);

const UseStyles = makeStyles(theme =>({
    '@global': {
      borderStyle:{
        backgroundColor: theme.palette.common.white
      },
    },
    paper: {
      marginTop: theme.spacing(8),
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
    },
    form: {
      width: '100%',
      marginTop: theme.spacing(3),
    },
    submit: {
      margin: theme.spacing(3, 0, 2),
    },
  }));

const SignUp = (props) => {
    const classes =UseStyles();
    const auth = getAuth();

    const [user, setUset] = useState({
      name: '',
      email: '',
      password: '',
      avatar: ''
    });

    const [alertMessage, setAlertMessage] = useState(null);

    const handleChange = (e) => {
     setUset({
       ...user,
       [e.target.name]: e.target.value
     });
    };

    const handleSubmit = (e) => {
     e.preventDefault();

     setAlertMessage(null);

     createUserWithEmailAndPassword(auth, user.email, user.password)
     .then(response => {
       // guardar los datos del usuario
       delete user.password;
       set(ref(database, `users/${response.user.uid}`), user); 
       //alert('Bienvenido a Chat App');
        setAlertMessage({
         type: 'success',
         message: 'Bienvenido a Chat App'
       }); 
       props.history.push('/');
     })
     .catch(error => {
       console.log(error);
       //alert(error.message);
       setAlertMessage({
        type: 'error',
        message: error.message
      }); 
     });
    };

    return (
      <Container component="main" maxWidth="xs">
        <CssBaseline />
        <div className={classes.paper}>
          <Typography component="h1" variant="h5">
            Registrarme en Chat App
          </Typography>
          <form className={classes.form} onSubmit={handleSubmit}>
            <Grid container spacing={2}>
              <Grid item xs={12} sm={6}>
                <TextField
                  autoComplete="fname"
                  name="name"
                  variant="outlined"
                  required
                  fullWidth
                  id="name"
                  label="Nombre"
                  autoFocus
                  value={user.name}
                  onChange={handleChange}
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  variant="outlined"
                  required
                  fullWidth
                  id="avatar"
                  label="URL avatar"
                  name="avatar"
                  value={user.avatar}
                  onChange={handleChange}
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  variant="outlined"
                  required
                  fullWidth
                  id="email"
                  label="Email Address"
                  name="email"
                  autoComplete="email"
                  value={user.email}
                  onChange={handleChange}
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  variant="outlined"
                  required
                  fullWidth
                  name="password"
                  label="Password"
                  type="password"
                  id="password"
                  autoComplete="current-password"
                  value={user.password}
                  onChange={handleChange}
                />
              </Grid>
            </Grid>
            <Button
              type="submit"
              fullWidth
              variant="contained"
              color="primary"
              className={classes.submit}
            >
              Registrarme
            </Button>
            <Grid container justify="flex-end">
              <Grid item>
                <Link to="/login" component={MyLink} variant="body2">
                  {"¿Ya tienes una cuenta? Ingresa aquí"}
                </Link>
              </Grid>
            </Grid>
          </form>
        </div>
        {alertMessage && 
          <Alert
            type={alertMessage.type}
            message={alertMessage.message}
            autoclose={5000}
          />
        }
      </Container>
    );
  };
  export default withRouter(SignUp);