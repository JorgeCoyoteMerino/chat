import React, { useState } from 'react';
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import TextField from '@material-ui/core/TextField';
import { Link as RouterLink, withRouter} from 'react-router-dom';
import Link from '@material-ui/core/Link';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import { getAuth, signInWithEmailAndPassword } from '@firebase/auth';
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
  avatar: {
    margin: theme.spacing(1),
    backgroundColor: theme.palette.secondary.main
  },
  form: {
    width: '100%',
    marginTop: theme.spacing(1),
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
  },
}));


const Login = (props) => {
  const auth = getAuth();
  const classes = UseStyles();
  const [user, setUser] = useState({
    email: '',
    password: ''
  });

  const [errorMessage, setErrorMessage] = useState('');

  const handleChange = (e) => {
    setUser({
      ...user,
      [e.target.name]: e.target.value
    });
   };

   const handleLogin = (e) => {
    e.preventDefault();
    setErrorMessage('');

    signInWithEmailAndPassword(auth, user. email, user.password)
    .then(response => {
      props.history.push('/');
    })
    .catch(error => {
      console.log(error);
      //alert(error.message);
      setErrorMessage(error.message);
    });
   };


   return (
    <Container component="main" maxWidth="xs">
      <CssBaseline />
      <div className={classes.paper}>
        <Typography component="h1" variant="h5">
          Ingresar a Chat App
        </Typography>
        <form className={classes.form} onSubmit={handleLogin}>
          <TextField
            variant="outlined"
            margin="normal"
            required
            fullWidth
            id="email"
            label="Email Address"
            name="email"
            autoComplete="email"
            autoFocus
            defaultValue={user.email}
            onChange={handleChange}
          />
          <TextField
            variant="outlined"
            margin="normal"
            required
            fullWidth
            name="password"
            label="Password"
            type="password"
            id="password"
            autoComplete="current-password"
            defaultValue={user.password}
            onChange={handleChange}
          />
          <Button
            type="submit"
            fullWidth
            variant="contained"
            color="primary"
            className={classes.submit}
          >
            Ingresar
          </Button>
          <Grid container>
            <Grid item>
              <Link to="/signup" component={MyLink} variant="body2">
                {"No tengo una cuenta"}
              </Link>
            </Grid>
          </Grid>
        </form>
      </div>
      {errorMessage &&
        <Alert type="error" message={errorMessage} autoclose={5000} />
      }
    </Container>
  );
};
export default withRouter(Login);
