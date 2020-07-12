import * as React from "react";
// https://enzymejs.github.io/enzyme/docs/api/shallow.html
import { shallow } from "enzyme";

import Button from "../../src/components/button/Button";

it("Renders a button with the appropriate styles and contents", () => {
    const wrapper = shallow(
        <Button id="catdog">This button</Button>
    );
    
    expect(wrapper.contains("This button")).toBeTruthy();
    expect(wrapper.hasClass("default-button")).toBeTruthy();
});
