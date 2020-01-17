import CForm from "../CForm";
import checkPropTypes from 'check-prop-types';

expect.addSnapshotSerializer(enzymeSerializer);

describe('CForm Component Tests', () => {

    let wrapper, mockFunction;
    beforeEach(() => {
        mockFunction = jest.fn();
        wrapper = shallow(<CForm id="test" onSubmit={mockFunction}/>);
    });

    test('if CForm Component is defined', () => {
        expect(wrapper.find('CForm')).toBeDefined();
    });

    test('if one Form Component is defined ', () => {
        expect(wrapper.find('#form_test')).toBeDefined();
        expect(wrapper.find('#form_test').length).toBe(1);
    });

    test('if all props required for Form component are defined', () => {
        let propRequired = [
            '_ref',
            'as',
            'bsPrefix',
            'children',
            'className',
            'id',
            'inline',
            'noValidate',
            'onSubmit',
            'validated',
        ];

        let propsOfForm = Object.keys(wrapper.find('#form_test').props());
        propRequired.forEach((propAvail, i) => (
            expect(propAvail).toContain(propsOfForm[i])
        ));
    });

    test('if onSubmit prop is of type function', () => {
        let result = checkPropTypes(CForm.propTypes, {
            id: "test", onSubmit: () => {
            }
        }, 'prop', CForm.name);
        expect(result).toBeUndefined();
    });

    test('if eventListener function is called on Submit', () => {
        wrapper.find('#form_test').simulate('submit');
        expect(mockFunction).toHaveBeenCalled();
    });

    describe('Snapshot Testing', () => {
        test('if matches snapshot', () => {
            expect(wrapper).toMatchSnapshot();
        })
    });
});