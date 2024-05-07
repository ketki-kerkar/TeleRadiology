import useAuth from './useAuth';
import axios from 'axios';

const UseRefreshToken = () => {
    const {setAuth} = useAuth();

    const refresh = async () => {
        const response = await axios.get('http://localhost:9191/api/v1/refresh', {
            refreshToken: localStorage.getItem('refreshToken')
        });

        const accessToken = response?.data?.accessToken;
        setAuth({accessToken});
        setAuth(prev => {
            console.log(JSON.stringify(prev));
            console.log(response.data.accessToken);
            return { ...prev, accessToken: response.data.accessToken}
        });
        return response.data.accessToken;
    }
  return refresh;
  
}

export default UseRefreshToken