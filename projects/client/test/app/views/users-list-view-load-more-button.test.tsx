import * as React from "react";
// https://enzymejs.github.io/enzyme/docs/api/shallow.html
import { mount } from "enzyme";
import { Provider } from 'react-redux';
import fs from 'fs';
import UsersListLoadMoreButton from "../../../src/app/views/UsersList/UsersListComponents/UsersListLoadMoreButton";

import configureStore from 'redux-mock-store';
const mockStore = configureStore();
 

describe("UsersListLoadMoreButton", () => {
    it("Displays a loading icon while loading", () => {
        const store = mockStore({
            usersList: {
                isLoadingUsers: true
            }
        });
        const wrapper = mount(
            <Provider store={store}>
                <UsersListLoadMoreButton></UsersListLoadMoreButton>
            </Provider>
        );
        
        // expect(wrapper.contains("Save"))).toBeTruthy();
        
        let html = wrapper.html();
        // The svg doesn't actually get loaded because jest doesn't load the svg.
        expect(html).toContain("<div style=\"width: 24px; height: 24px; margin: auto;\" class=\"loading-indicator\"></div>")
    });

    it("Displays 'Load More' while idle", () => {
        const store = mockStore({
            usersList: {
                isLoadingUsers: false
            }
        });
        const wrapper = mount(
            <Provider store={store}>
                <UsersListLoadMoreButton></UsersListLoadMoreButton>
            </Provider>
        );
        
        // expect(wrapper.contains("Save"))).toBeTruthy();
        
        let html = wrapper.html();
        // The svg doesn't actually get loaded because jest doesn't load the svg.
        expect(html).toContain("Load More");
    });
})