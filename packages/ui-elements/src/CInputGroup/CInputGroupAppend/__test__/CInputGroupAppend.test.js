import CInputGroupAppend from '../CInputGroupAppend';
import {InputGroup, Button} from 'react-bootstrap';

expect.addSnapshotSerializer(enzymeSerializer);
describe('CInputGroupAppend', () => {
    let wrapper;
    beforeEach(() => {
        wrapper = mount(
            <CInputGroupAppend
                id="appendInputGroup"
                classes="hello"
                append={''}
            />);
    });
    afterEach(() => {
        wrapper.unmount();
    });
    it('should be defined', () => {
        expect(wrapper).toBeDefined();
    });

    it('should have given props available', () => {
        const propsForAppend = ['id', 'classes', 'append'];
        const appendPropsAv = Object.keys(wrapper.props())
        propsForAppend.map((propsForApp, i) => {
            expect(propsForAppend).toContain(appendPropsAv[i])
        });
    });

    it('should have at least one element of input inside append element', () => {
        const a = [<InputGroup.Text key="addOn-1" id="basic-addOn3">
            https://example.com/users/
        </InputGroup.Text>,
            <Button key="button2" id="button2" variant="outline-secondary">Button</Button>
        ]
        wrapper.setProps({append: a})
        expect(wrapper.find('#basic-addOn3').length).toBeGreaterThan(1);
    });

    describe('Snapshot testing', () => {
        it('should match the previous snapshot', () => {
            expect(wrapper).toMatchSnapshot();
        })
    });

})