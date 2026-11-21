import React from 'react';

import MenuItem from '../menu-item/menu-item.component';
import DIRECTORY_SECTIONS from '../../data/directory.data';

import './directory.styles.scss';

const Directory = () => (
  <div className="directory-menu">
    {DIRECTORY_SECTIONS.map(({ id, ...otherSectionProps }) => (
      <MenuItem key={id} {...otherSectionProps} />
    ))}
  </div>
);

export default Directory;
