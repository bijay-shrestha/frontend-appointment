import React from 'react';
import AuthenticateHOC from '../AuthenticateHoc';

describe('AuthenticateHoc Component', () => {
    it('should render the component only when the token is true',() => {
        const elem = `<h1>Hola</h1>`
        const Component = elem
        const ConditionalComponent = AuthenticateHOC(Component,()=>true)
        const RenderComp = (<ConditionalComponent/>)
        const wrapper= shallow(RenderComp);
        expect(wrapper.props().children[1].type).toBe(elem);
    });
     it('should not render the component only when the token is false',() => {
        const elem = `<h1>Hola</h1>`
        const Component = elem
        const ConditionalComponent = AuthenticateHOC(Component,()=>false)
        const wrapper= shallow(<ConditionalComponent/>);
        expect(wrapper.props().children[1].type).not.toBe(elem);
    })
})