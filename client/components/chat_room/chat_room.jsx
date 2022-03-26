import { useContext, useEffect, useState } from 'react';
import { useNavigate } from 'react-router';
import { ApiContext } from '../../utils/api_context';
import { AuthContext } from '../../utils/auth_context';
import { RolesContext } from '../../utils/roles_context';
import { Button } from '../common/button';
import { TopNav } from '../common/topNav';

export const ChatRoom = () => {
  const [, setAuthToken] = useContext(AuthContext);
  const api = useContext(ApiContext);


  const navigate = useNavigate();

  const [loading, setLoading] = useState(true);
  useEffect(async () => {
    const res = await api.get('/users/me');
    setUser(res.user);
    setLoading(false);
  }, []);


  return (
    <div>
      <TopNav/>
      <div className="p-4">
        <h1>Chat Room</h1>
      </div>
    </div>
  );
};
