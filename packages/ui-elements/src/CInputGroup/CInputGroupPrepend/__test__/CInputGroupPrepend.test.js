import CInputGroupPrepend from '../CInputGroupPrepend';
import {InputGroup, Button} from 'react-bootstrap';

expect.addSnapshotSerializer(enzymeSerializer);
describe('CInputGroup Prepend', () => {
    let wrapper;
    beforeEach(() => {
        wrapper = mount(
            <CInputGroupPrepend
                id="prependInputGroup"
                classes="hello"
                append={''}/>);
    });

    afterEach(() => {
        wrapper.unmount();
    });

    it('should render component', () => {
        expect(wrapper).toBeDefined();
    });

    it('should have given props available', () => {
        const propsForAppend = ['id', 'classes', 'append'];
        const appendPropsAv = Object.keys(wrapper.props())
        propsForAppend.map((propsForApp, i) => {
            expect(propsForAppend).toContain(appendPropsAv[i])
        });
    });

    it('should have atleast one element of input inside append element', () => {
        const p = [<InputGroup.Text key="addOn-1" id="basic-addOn3">
            https://example.com/users/
        </InputGroup.Text>,
            <Button key="button2" id="button2" variant="outline-secondary">Button</Button>
        ]
        wrapper.setProps({prepend: p})
        expect(wrapper.find('#basic-addOn3').length).toBeGreaterThan(1);
    });

    describe('Snapshot testing', () => {
        it('should match the previous snapshot', () => {
            expect(wrapper).toMatchSnapshot();
        })
    });
})