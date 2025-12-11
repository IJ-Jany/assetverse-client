
import { getAuth } from 'firebase/auth';
import { app } from '../firebase/firebase.config';

const auth = getAuth(app);

export const getIdToken = async () => {
  const currentUser = auth.currentUser;
  if (!currentUser) return null;
  return await currentUser.getIdToken();
};
