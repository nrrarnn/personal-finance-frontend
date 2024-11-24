import { useSelector } from 'react-redux';
import { Navigate } from 'react-router-dom';
import { RootState } from '../store/store'; 
import { ReactNode } from 'react';

interface MyComponentProps {
    children: ReactNode; 
}
const PrivateRoute: React.FC<MyComponentProps> = ({ children }) => {
  const token = useSelector((state: RootState) => state.auth.token);
  
  if (!token) {
    return <Navigate to="/login" />;
  }

  return children;
};

export default PrivateRoute;
