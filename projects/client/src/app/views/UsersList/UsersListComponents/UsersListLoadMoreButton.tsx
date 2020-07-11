import * as React from 'react';
import Button from '../../../../components/button/Button';
import { connect, ConnectedProps } from "react-redux";
import { getNextPage } from '../UsersListActionCreators';

import type { RootState } from '../../../../store/configure-store'

import './users-list-body.css';

const mapStateToProps = (state: RootState) => {
    return {
        nextToken: state.usersList.nextToken,
        filter: state.usersList.filter,
        isLoadMoreAvailable: state.usersList.isLoadMoreAvailable,
        isLoadingUsers: state.usersList.isLoadingUsers
    };
};

const mapDispatchToProps = {
    getNextPage: getNextPage
};

const connector = connect(mapStateToProps, mapDispatchToProps);

type PropsFromRedux = ConnectedProps<typeof connector>;

const UsersListLoadMoreButton: React.FunctionComponent<PropsFromRedux> = (props: PropsFromRedux) => {
    const { getNextPage, nextToken, filter, isLoadMoreAvailable, isLoadingUsers } = props;
    return (
        <Button disabled={!isLoadMoreAvailable || isLoadingUsers} onClick={(e) => {
            getNextPage(nextToken, filter);
        }}>
            Load More
        </Button>
    );
}

const UsersListLoadMoreButtonComponent = connector(UsersListLoadMoreButton);
export default UsersListLoadMoreButtonComponent;