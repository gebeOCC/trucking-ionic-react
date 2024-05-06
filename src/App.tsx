import { setupIonicReact } from '@ionic/react';
import { useEffect, useState } from 'react';
import axiosInstance from './axios/axiosInstance';
import ClientRoutes from './routes/clientRoutes';
import DriverRoutes from './routes/driverRoutes';
import GuestRoutes from './routes/guestRoutes';

setupIonicReact();

function App() {
  const [role, setRole] = useState('');

  useEffect(() => {
    const fetchUser = async () => {
      axiosInstance
        .get('user', { withCredentials: true })
        .then((response) => {
          if (response.data.message === 'unauthorized' || response.data === 'admin' || response.data.message === 'email not verified') {
            setRole('guest');
          } else{
            setRole(response.data);
          }
        })
        .catch((error) => {
          setRole('guest');
        });
    };
    fetchUser();
  }, []);

  let routes;
  switch (role) {
    case 'client':
      routes = <ClientRoutes />;
      break;
    case 'driver':
      routes = <DriverRoutes />;
      break;
    case 'guest':
      routes = <GuestRoutes />;
      break;
    default:
      routes = null;
  }
  return routes;
}

export default App;
