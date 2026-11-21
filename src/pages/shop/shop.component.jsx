import React from 'react';
import { Routes, Route } from 'react-router';

import useCollections from '../../hooks/use-collections';
import Spinner from '../../components/spinner/spinner.component';
import CollectionsOverview from '../../components/collections-overview/collections-overview.component';
import CollectionPage from '../collection/collection.component';

const ShopPage = () => {
  const { collections, isLoading, error } = useCollections();

  if (isLoading) return <Spinner />;
  if (error) return <p className="shop-error">Couldn't load the shop. Please try again later.</p>;

  return (
    <div className="shop-page">
      <Routes>
        <Route index element={<CollectionsOverview collections={Object.values(collections)} />} />
        <Route path=":collectionId" element={<CollectionPage collections={collections} />} />
      </Routes>
    </div>
  );
};

export default ShopPage;
