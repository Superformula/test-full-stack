import React, { useCallback } from 'react';
import { Input } from '../../../components/input/Input';

interface UserSearchProps {
  onChange: (text: string) => void
}

const UserSearch: React.FC<UserSearchProps> = ({ onChange }) => {
  const onChangeHandler = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    onChange(e.target.value);
  }, [onChange]);

  return (<Input placeholder="Search..." onChange={onChangeHandler} />);
};

export default UserSearch;
