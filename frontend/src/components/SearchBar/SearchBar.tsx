import React, { useCallback, useState } from 'react';
import { useQueryParam, StringParam, NumberParam } from 'use-query-params';
import { useDebounceCallback } from '@react-hook/debounce';
import styles from './SearchCard.module.scss';

const SearchBar: React.FC = () => {
  const [search, setSearch] = useState('');

  const [, setQuerySearchTerm] = useQueryParam('searchTerm', StringParam);
  const [page, setPage] = useQueryParam('page', NumberParam);

  const setQueryCallback = useCallback(
    (searchTerm: string) => {
      // Reset the page index
      setPage(1);

      // Set the query search
      setQuerySearchTerm(searchTerm);
    },
    [setQuerySearchTerm, setPage],
  );
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
