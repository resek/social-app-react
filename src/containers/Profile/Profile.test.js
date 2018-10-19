import React from 'react';
import {shallow} from 'enzyme';

import Profile from './Profile';

test("renders component correctly", () => {
    const wrapper = shallow(<Profile />);
    expect(wrapper).toMatchSnapshot();  
});

test("component renders input", () => {
    const wrapper = shallow(<Profile />);
    expect(wrapper.find("input").length).toEqual(1);
});

test("input change test", () => {
    const wrapper = shallow(<Profile />);
    expect(wrapper.state().newPassword).toEqual(null);
    wrapper.find("input").simulate("change", {target: {value: "abcd1234"}});
    expect(wrapper.state().newPassword).toEqual("abcd1234");
})

test("componentDidMount set state with fetched data", async () => {
    const wrapper = shallow(<Profile />);
    expect(wrapper.state().logedinUserData).toBe(null);
    wrapper.instance().componentDidMount()
    await new Promise((resolve) => setTimeout(resolve, 0));
    wrapper.update();
    expect(wrapper.state().logedinUserData).toEqual({
        email: "toni@gmail.com",
        exp: 1539878266,
        iat: 1539874666,
        userId: "5bc069adb94d060015666528",
        username: "Toni"
    });
});

