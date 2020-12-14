import React, { useCallback, useState } from 'react';
import { useQueryParam, StringParam } from 'use-query-params';
import { useDebounceCallback } from '@react-hook/debounce';
import styles from './SearchCard.module.scss';

const SearchBar: React.FC = () => {
  const [search, setSearch] = useState('');

  const [, setQuerySearchTerm] = useQueryParam('searchTerm', StringParam);

  const setQueryCallback = useCallback((searchTerm: string) => setQuerySearchTerm(searchTerm), [setQuerySearchTerm]);
  const debouncedSetQuery = useDebounceCallback(setQueryCallback, 500);

  const onInputChange = useCallback(
    (evt: React.ChangeEvent<HTMLInputElement>) => {
      setSearch(evt.target.value);
      debouncedSetQuery(evt.target.value);
    },
    [setSearch, debouncedSetQuery],
  );

  return <input placeholder="Search..." className={styles.input} value={search} onChange={onInputChange} />;
};

export default React.memo(SearchBar);
