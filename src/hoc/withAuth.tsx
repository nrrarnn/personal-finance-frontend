import  { ComponentType } from 'react';
import { useSelector } from 'react-redux';
import { RootState } from '../store/store'; 

interface WithAuthProps {
  token: string | null;
  username: string | null;
  email: string | null;
}

function withAuth<P extends WithAuthProps>(WrappedComponent: ComponentType<P>) {
  return function WithAuthWrapper(props: Omit<P, keyof WithAuthProps>) {
    const token = useSelector((state: RootState) => state.auth.token);
    const username = useSelector((state: RootState) => state.auth.username);
    const email = useSelector((state: RootState) => state.auth.email);

    return <WrappedComponent {...(props as P)} token={token} username={username} email={email} />;
  };
}

export default withAuth;
