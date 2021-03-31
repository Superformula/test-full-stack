import { ReactElement, ReactNode, FormEventHandler } from 'react'

interface Props {
  onSubmit: FormEventHandler;
  children: ReactNode;
}

export default function Form({ onSubmit, children }: Props): ReactElement {
  return <form onSubmit={onSubmit}>{children}</form>
}
