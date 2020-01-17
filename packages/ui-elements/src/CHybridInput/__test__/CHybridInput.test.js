import CHybridInput from "../CHybridInput";

expect.addSnapshotSerializer(enzymeSerializer);

describe('CFControl Component Tests', () => {

    let wrapper, mWrapper,mockFunction;
    beforeEach(() => {
        mockFunction = jest.fn();
        wrapper = shallow(<CHybridInput id="test" onChange={mockFunction}/>);
        mWrapper = mount(<CHybridInput id="test" onChange={mockFunction}/>);
    });

    afterEach(() => mWrapper.unmount());

    it('should be defined', () => {
        expect(wrapper.find('CHybridInput')).toBeDefined();
    });

    it('should have only one Form.Control component', () => {
        expect(wrapper.find('#fControl_test').length).toBe(1);
    });

    it('should have all props available', () => {
        let propsAvailable = [
            '_ref',
            'as',
            'autoComplete',
            'bsPrefix',
            'children',
            'className',
            'defaultValue',
            'disabled',
            'id',
            'isInvalid',
            'isValid',
            'max',
            'min',
            'multiple',
            'name',
            'onBlur',
            'onChange',
            'onFocus',
            'pattern',
            'plaintext',
            'readOnly',
            'required',
            'rows',
            'size',
            'type',
            'value',
        ];
        let propsOfFormControl = Object.keys(wrapper.find('#fControl_test').props());
        propsAvailable.forEach((propAvail, i) => (
            expect(propAvail).toContain(propsOfFormControl[i])
        ));
    });

    describe('Input field events simulation', () => {

        beforeEach(()=>{

        });

        // it('should call event handler function onChange', () => {
        //     mWrapper.simulate('change');
        //     expect(mockFunction).toHaveBeenCalled();
        // });
    });

    describe('Snapshot Testing', () => {
        it('should match snapshot', () => {
            expect(wrapper).toMatchSnapshot();
        })
    });

});
