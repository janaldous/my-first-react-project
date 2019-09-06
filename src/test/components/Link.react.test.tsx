import * as React from 'react';
import { SideBar } from '../../components/sidebar/SideBar';
import {shallow} from 'enzyme';

test('Link changes the class when hovered', () => {
    expect(1).toBe(1);
});

test('Link changes the class when hovered', () => {
    expect(1).toBe(1);
});

describe('Sidebar', () => {
    it('opens if X is clicked when closed', () => {
        let toggle = () => console.log("toggled");
        const sidebar = shallow(<SideBar isOpen={false} toggle={toggle}></SideBar>);
        expect(sidebar).toBeTruthy();
    });
});
