import React from 'react';
import { useParams } from 'react-router';
import { useSelector } from 'react-redux';

import CollectionItem from '../../components/collection-item/collection-item.component.jsx'
import { selectCollection } from '../../redux/shop/shop.selectors';

import './collection.styles.scss';

const CollectionPage = () => {
  const { collectionId } = useParams();
  const collection = useSelector(selectCollection(collectionId));
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
