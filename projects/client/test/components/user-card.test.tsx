import * as React from "react";
// https://enzymejs.github.io/enzyme/docs/api/shallow.html
import { shallow } from "enzyme";

import UserCard from "../../src/components/user-card/UserCard";

it("Renders a user card with the all caps name and description", () => {
    const wrapper = shallow(
        <UserCard id="catdog" name="Matthew" description="A cool guy"></UserCard>
    );
    
    expect(wrapper.contains(<h2>MATTHEW</h2>)).toBeTruthy();
    expect(wrapper.contains(<p>A cool guy</p>)).toBeTruthy();
});