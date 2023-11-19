import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { setCredentials } from '../../redux/auth/authSlice';

const useRehydrateAuth = () => {
  const dispatch = useDispatch();
  const { isLoggedIn } = useSelector((state) => state.auth);
  
  useEffect(() => {
    console.log("listening form inside the hydrate")

    if (!isLoggedIn) {
        const storedUser = localStorage.getItem('user');
        console.log('this is the data', localStorage.getItem('user'))
        const storedToken = localStorage.getItem('token');
      if (storedUser && storedToken) {
        dispatch(setCredentials(storedUser, storedToken));
      }
    }
  }, [isLoggedIn]);
};

export default useRehydrateAuth;
