import * as React from "react";
// https://enzymejs.github.io/enzyme/docs/api/shallow.html
import { mount } from "enzyme";
import { Provider } from 'react-redux';
import fs from 'fs';
import EditUserModalSaveButton from "../../../src/app/modals/EditUserModal/EditUserModalComponents/EditUserModalSaveButton";

import configureStore from 'redux-mock-store';
const mockStore = configureStore();
 

describe("EditUserModalSaveButton", () => {
    it("Displays a loading icon while saving", () => {
        const store = mockStore({
            editUser: {
                editUser: {
                    id: "id",
                    name: "Matt",
                    address: "",
                    createdAt: 0,
                    description: ""
                },
                isSaving: true
            }
        });
        const wrapper = mount(
            <Provider store={store}>
                <EditUserModalSaveButton></EditUserModalSaveButton>
            </Provider>
        );
        
        // expect(wrapper.contains("Save"))).toBeTruthy();
        
        let html = wrapper.html();
        // The svg doesn't actually get loaded because jest doesn't load the svg.
        expect(html).toContain("<div style=\"width: 24px; height: 24px; margin: auto;\" class=\"loading-indicator\"></div>")
    });

    it("Displays 'Save' while idle", () => {
        const store = mockStore({
            editUser: {
                editUser: {
                    id: "id",
                    name: "Matt",
                    address: "",
                    createdAt: 0,
                    description: ""
                },
                isSaving: false
            }
        });
        const wrapper = mount(
            <Provider store={store}>
                <EditUserModalSaveButton></EditUserModalSaveButton>
            </Provider>
        );
        
        // expect(wrapper.contains("Save"))).toBeTruthy();
        
        let html = wrapper.html();
        // The svg doesn't actually get loaded because jest doesn't load the svg.
        expect(html).toContain("Save");
    });
})