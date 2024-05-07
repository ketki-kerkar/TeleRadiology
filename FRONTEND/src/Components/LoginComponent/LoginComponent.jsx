import * as React from 'react';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
import Link from '@mui/material/Link';
import Paper from '@mui/material/Paper';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import Typography from '@mui/material/Typography';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import axios from 'axios';
import { useState , useRef, useContext} from 'react'; 
import { useNavigate} from 'react-router-dom';
import useAuth from '../../Hooks/useAuth';
import { LoggedInUserContext } from '../../Context/LoggedInUserContext';

const defaultTheme = createTheme();

export default function LoginComponent() {
  const { setAuth } = useAuth();
  const navigate = useNavigate();
  const userRef = useRef();

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const [token, setToken] = useState('');
  const { loggedinUser, setLoggedinUser } = useContext(LoggedInUserContext);
  
  const handleSubmit = async (event) => { 
    event.preventDefault();
    setIsLoading(true);
    try {
      const response = await axios.post('http://localhost:9191/api/v1/authenticate', {
        email: email,
        password: password
      });

      console.log(JSON.stringify(response?.data));
      const accessToken = response?.data?.accessToken;
      const roles = response?.data?.roles;
      setAuth({ email, password, roles, accessToken });
      setEmail('');
      setPassword('');

      const userData = response.data;
      const authToken = userData.token;
      const role = userData.role;

      setLoggedinUser({
        ...loggedinUser,
        token: userData.token,
        user: userData.user,
        role: role,
      });

      setToken(authToken);
      console.log("role", role);
      console.log(role,"\n","authtoken begins", authToken, "ends");
  
      switch (role) {
        case 'doctor':
          navigate('/doctor');
          break;
        case 'admin':
          navigate('/admin');
          break;
        case 'lab':
          navigate('/lab');
          break;
        case 'radiologist':
          navigate('/radiologist');
          break;
        case 'receptionist':
          navigate('/receptionist');
          break;
        case 'patient':
          navigate('/patient');
          break;
        default:
          // If no specific role matches, you can redirect to a default route
          navigate('/login');
      }

    } catch (error) {
      console.error(error);
      let errorMessage = "An error occurred";
      if (error.response) {
        errorMessage = error.response.data.message || "An error occurred";
      }
      setError(errorMessage);
    } finally {
      setIsLoading(false);
    }
  }
  

  return (
    <>
    <ThemeProvider theme={defaultTheme}>
      <Grid container component="main" sx={{ height: '100vh' }}>
        <CssBaseline />
        <Grid
          item
          xs={false}
          sm={6}
          md={6}
          sx={{
            backgroundImage: 'url(https://source.unsplash.com/random?wallpapers)',
            backgroundRepeat: 'no-repeat',
            backgroundColor: (t) =>
              t.palette.mode === 'light' ? t.palette.grey[50] : t.palette.grey[900],
            backgroundSize: 'cover',
            backgroundPosition: 'center',
          }}
        />
        <Grid item xs={12} sm={6} md={6} component={Paper} elevation={6} square>
          <Box
            sx={{
              my: 8,
              mx: 4,
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
            }}
          >
            <Avatar sx={{ m: 1, bgcolor: '#1976D2' }}>
              <LockOutlinedIcon />
            </Avatar>
            <Typography component="h1" variant="h5">
              Sign in
            </Typography>
            <Box component="form" onSubmit={handleSubmit} sx={{ mt: 1 }}>
              <TextField
                margin="normal"
                required
                fullWidth
                id="email"
                ref={userRef}
                label="Email Address"
                name="email"
                autoComplete="email"
                autoFocus
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                sx={{backgroundColor: '#fff', boxShadow: '0px 2px 4px rgba(0, 0, 0, 0.1)',  '& .MuiInputLabel-root': {color: '#000'},
                '& .MuiOutlinedInput-root': {'& fieldset': { borderColor: '#000', borderRadius: '4px', },'&:hover fieldset': { borderColor: '#000',},
                  '&.Mui-focused fieldset': {borderColor: '#000', },},}}
              />
              <TextField
                margin="normal"
                required
                fullWidth
                name="password"
                label="Password"
                type="password"
                id="password"
                autoComplete="current-password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                autoFocus
                sx={{backgroundColor: '#fff', boxShadow: '0px 2px 4px rgba(0, 0, 0, 0.1)',  '& .MuiInputLabel-root': {color: '#000'},
                '& .MuiOutlinedInput-root': {'& fieldset': { borderColor: '#000', borderRadius: '4px', },'&:hover fieldset': { borderColor: '#000',},
                  '&.Mui-focused fieldset': {borderColor: '#000', },},}}
              />
              <FormControlLabel
                control={<Checkbox value="remember" color="primary" />}
                label="Remember me"
              />
              <Button
                type="submit"
                fullWidth
                variant="contained"
                sx={{ mt: 3, mb: 2 }}
                disabled={isLoading}
              >
                {isLoading ? 'Signing in...' : 'Sign In'}
              </Button>
              {error && (
                <Typography variant="body2" color="error">
                  {error}
                </Typography>
              )}
              <Grid container>
                <Grid item xs>
                  <Link href="../ForgotPassword" variant="body2">
                    Forgot password?
                  </Link>
                </Grid>
              </Grid>
            </Box>
          </Box>
        </Grid>
      </Grid>
    </ThemeProvider>
    </>
  );
}
