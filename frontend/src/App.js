import React from 'react';
import './App.css';
import { UserCard } from "./user/UserCard";
import { SearchBar } from "./common/SearchBar";

const SEARCH_BAR_LABEL = 'User list'
const SEARCH_BAR_PLACEHOLDER = 'Search...'

export const App = () => {
  return (
    <div className={'body-container'}>
      <SearchBar label={SEARCH_BAR_LABEL} placeholder={SEARCH_BAR_PLACEHOLDER} />
      <UserCard
        name={'test'}
        description={'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec auctor risus a nulla pretium, in vestibulum neque commodo.'}
        createdAt={'01 feb 2020'}
      />
    </div>
  );
};
