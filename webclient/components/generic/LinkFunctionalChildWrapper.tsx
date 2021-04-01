// See: https://nextjs.org/docs/api-reference/next/link#if-the-child-is-a-function-component

import { forwardRef, ReactNode } from 'react'

interface RefProps {
  children?: ReactNode;
  onClick?: () => void;
  href?: string;
}

const LinkFunctionalChildWrapper = forwardRef<HTMLAnchorElement, RefProps>(
  function LinkFunctionalChildWrapper(
    {
      children,
      onClick,
      href
    }: { children: ReactNode, onClick: () => void, href: string },
    ref
  ) {
    return (
      <a href={href} onClick={onClick} ref={ref}>
        {children}
      </a>
    )
  }
)

export default LinkFunctionalChildWrapper
