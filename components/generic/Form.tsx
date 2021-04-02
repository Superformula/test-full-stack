import { ReactElement, ReactNode, FormEventHandler } from 'react'

interface Props {
  onSubmit: FormEventHandler;
  children: ReactNode;
  className?: string;
}

export default function Form({
  onSubmit,
  children,
  className
}: Props): ReactElement {
  return (
    <form onSubmit={onSubmit} className={className}>
      {children}
    </form>
  )
}
