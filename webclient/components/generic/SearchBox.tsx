import { ReactElement, ChangeEvent } from 'react'

import Input from './Input'

import styles from './SearchBox.module.css'

interface Props {
  value: string;
  placeholder?: string;
  onSearchTermChange: (event: ChangeEvent<HTMLInputElement>) => void;
}

export default function SearchBox({
  value,
  placeholder = 'Search...',
  onSearchTermChange
}: Props): ReactElement {
  return (
    <div className={styles.wrapper}>
      <Input
        value={value}
        onInput={onSearchTermChange}
        type={'text'}
        placeholder={placeholder}
        className={styles.searchInput}
      />
    </div>
  )
}
