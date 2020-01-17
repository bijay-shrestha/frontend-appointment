import CInputGroup from '../CInputGroup';
import {InputGroup, Button} from 'react-bootstrap';

expect.addSnapshotSerializer(enzymeSerializer);
describe('InputGroup Test', () => {
    let wrapper, wrapper1;
    beforeEach(() => {
        wrapper = mount(<CInputGroup id="inputGroup"/>);
        wrapper1 = shallow(<CInputGroup id="inputGroup"/>);

    });
    afterEach(() => {
        wrapper.unmount();
    })
    it('should render successfully', () => {
        expect(wrapper1).toBeDefined();
    });
    it('should have only one input group component', () => {
        expect(wrapper1.find('#inputGroup')).toHaveLength(1);
    });
    it('should have given props available', () => {
        const propsAvailable = [
            'id',
            'className',
            'as',
            'size',
            'bsPrefix',
            'children'
        ];

        const propsOfInputGroup = Object.keys(wrapper.children().props());
        propsAvailable.map((propsA, index) => {
            expect(propsAvailable).toContain(propsOfInputGroup[index]);
        });
    });

    it('should have only one prepend input group element if provided', () => {
        const p = [
            <InputGroup.Text key="addOn-1" id="basic-addOn3">
                https://example.com/users/
            </InputGroup.Text>,
            <Button key="button2" id="button2" variant="outline-secondary">
                Button
            </Button>
        ];
        wrapper1.setProps({prepend: p});
        expect(wrapper1.find('#prependinputGroup')).toHaveLength(1)
    });

    it('should have only one append input group element if provided', () => {
        const a = [
            <InputGroup.Text key="addOn-1" id="basic-addOn3">
                https://example.com/users/
            </InputGroup.Text>,
            <Button key="button2" id="button2" variant="outline-secondary">
                Button
            </Button>
        ]
        wrapper1.setProps({append: a});
        expect(wrapper1.find('#appendinputGroup')).toHaveLength(1)
    });
    describe('Snapshot testing', () => {
        it('should match the previous snapshot', () => {
            expect(wrapper).toMatchSnapshot();
        })

    });
})