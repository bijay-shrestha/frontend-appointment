import CFormGroup from "../CFormGroup";

expect.addSnapshotSerializer(enzymeSerializer);

describe('CFormGroup Component Tests', () => {

    let wrapper;
    beforeEach(() => {
        wrapper = shallow(<CFormGroup id="test"/>);
    });

    test('if CFormGroup Component is defined', () => {
        expect(wrapper.find('CFormGroup')).toBeDefined();
    });

    test('if Form.Group component is defined', () => {
        expect(wrapper.find('#group_test').length).toBe(1);
    });

    test('if all props required for Form.Group component are defined', () => {
        let propRequired = [
            '_ref',
            'as',
            'bsPrefix',
            'children',
            'className',
            'controlId',
            'id'
        ];

        let propsOfFormGroup = Object.keys(wrapper.find('#group_test').props());
        propRequired.forEach((propAvail, i) => (
            expect(propAvail).toContain(propsOfFormGroup[i])
        ));
    });

    describe('Snapshot Testing', () => {
        test('if matches snapshot', () => {
            expect(wrapper).toMatchSnapshot();
        })
    });
});