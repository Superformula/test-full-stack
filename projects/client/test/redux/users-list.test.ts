import configureStore from 'redux-mock-store';
import thunkMiddleware from 'redux-thunk';
import { getPages } from "../../src/app/views/UsersList/UsersListActionCreators";
import { UsersListActionTypes } from "../../src/app/views/UsersList/UsersListRedux";
import { AsynchronousActionStatus } from "../../src/store/AsynchronousRedux";

const mockStore = configureStore([thunkMiddleware]);

const fetchAny = (fetchMock as any);

describe('UsersList Reducer', () => {
    it("Creates SUCCESS when getPages is done", () => {
        const store = mockStore({
            usersList: {
                users: {},
                isLoadingUsers: true
            }
        });

        const mockUsers = [
            {
                "id": "935e902e-7d6f-4590-a3d4-96a39222b6d3",
                "name": "Lili",
                "address": "",
                "dob": null
            },
            {
                "id": "13940990-547c-4dc6-a8dd-1438e99191f0",
                "name": "Bill",
                "address": "St. Louis",
                "dob": null
            },
        ];
        fetchAny.mockResponses([
            JSON.stringify({
                data: {
                    getPages: {
                        users: mockUsers,
                        nextToken: null
                    }
                }
            }),
            { status: 200 }
        ]);
        // fetchMock.dontMock();
        // fetch.once({
        //     data: {
        //         getPages: {
        //             users: mockUsers,
        //             nextToken: null
        //         }
        //     }
        // });
        const expectedActions = [
            { type: UsersListActionTypes.FETCH_PAGES, status: AsynchronousActionStatus.IN_PROGRESS },
            {
                status: AsynchronousActionStatus.SUCCESS,
                type: UsersListActionTypes.FETCH_PAGES,
                users: mockUsers,
                nextToken: null
            }
        ];

        return store.dispatch(getPages(1, "")).then(() => {
            expect(store.getActions()).toEqual(expectedActions)
        });
    });
});