import React from 'react';
import styles from './SearchCard.module.scss';

const SearchBar: React.FC = () => {
  console.log('stop collapsing me!');
  return <input placeholder="Search..." className={styles.input} />;
};

export default SearchBar;
