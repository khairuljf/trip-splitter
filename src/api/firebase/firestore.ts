import { getFirestore } from 'firebase/firestore';

import { firebaseApp } from './firebaseConfig';

export const firestore = getFirestore(firebaseApp);

