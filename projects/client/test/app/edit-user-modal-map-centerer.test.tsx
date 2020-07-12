import * as React from "react";
// https://enzymejs.github.io/enzyme/docs/api/shallow.html
import { shallow } from "enzyme";

import EditUserModalMapCenterer from "../../src/app/modals/EditUserModal/EditUserModalComponents/EditUserModalMap/EditUserModalMapCenterer";

class MapMock {
    public pannedTo: null | {lat: number, lng: number};
    constructor() {
        this.pannedTo = null;
    }

    panTo(location: {lat: number, lng: number}) {
        this.pannedTo = location;
    }
}

describe("EditUserModalMapCenterer", () => {
    const mapMock = new MapMock();

    it("Pans the google map when location is updated", () => {
        const panLocation = {
            lat: 38,
            lng: -94
        };

        const wrapper = shallow(
            <EditUserModalMapCenterer map={mapMock} location={null}></EditUserModalMapCenterer>
        );
        
        expect(mapMock.pannedTo === null).toBeTruthy();

        // https://enzymejs.github.io/enzyme/docs/api/ShallowWrapper/setProps.html
        wrapper.setProps({
            location: panLocation
        });

        expect(mapMock.pannedTo.lat === panLocation.lat).toBeTruthy();
        expect(mapMock.pannedTo.lng === panLocation.lng).toBeTruthy();
    });
});