// eslint-disable
import * as Types from '../../@types/types';

import { UserFragment } from './user-fragment';
import gql from 'graphql-tag';
import { UserFragmentDoc } from './user-fragment';

export type PagedUserResultFragment = { __typename?: 'PagedUserResult' } & Pick<
  Types.PagedUserResult,
  'isLastPage' | 'count' | 'cursor'
> & { values: Array<{ __typename?: 'User' } & UserFragment> };

export const PagedUserResultFragmentDoc = gql`
  fragment PagedUserResult on PagedUserResult {
    values {
      ...User
    }
    isLastPage
    count
    cursor
  }
  ${UserFragmentDoc}
`;
