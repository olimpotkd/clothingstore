import React from 'react';
import { useParams } from 'react-router';

import CollectionItem from '../../components/collection-item/collection-item.component.jsx'

import './collection.styles.scss';

const CollectionPage = ({ collections }) => {
  const { collectionId } = useParams();
  const collection = collections[collectionId];

  if (!collection) {
    return (
      <div className="collection-page">
        <h2 className='title'>Collection not found</h2>
      </div>
    );
  }

  const { title, items } = collection;

  return (
    <div className="collection-page">
      <h2 className='title'>{title}</h2>
      <div className="items">
        {
          items.map(item => <CollectionItem item={item} key={item.id}/>)
        }
      </div>
    </div>
  )
}

export default CollectionPage;
