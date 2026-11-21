import { useEffect, useState } from 'react';

import { firestore, convertCollectionsSnapshotToMap } from '../firebase/firebase.utils';

// Fetches the shop collections from Firestore once, keyed by route name (e.g. "hats").
const useCollections = () => {
  const [state, setState] = useState({ collections: null, isLoading: true, error: null });

  useEffect(() => {
    let cancelled = false;

    firestore.collection('collections').get()
      .then(snapshot => {
        if (!cancelled) {
          setState({ collections: convertCollectionsSnapshotToMap(snapshot), isLoading: false, error: null });
        }
      })
      .catch(error => {
        if (!cancelled) setState({ collections: null, isLoading: false, error });
      });

    return () => { cancelled = true; };
  }, []);

  return state;
};

export default useCollections;
