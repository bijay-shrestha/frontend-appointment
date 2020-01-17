import Enzyme,{shallow,mount,render} from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import enzymeSerializer from 'enzyme-to-json/serializer';
import React from 'react';

Enzyme.configure({ adapter: new Adapter() });
global.shallow = shallow;//making shallow global object
global.render = render;//making render global object
global.mount = mount;//making mount global object
global.enzymeSerializer =enzymeSerializer;//making enzymeSerializer global object
global.React=React;

