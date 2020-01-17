import CFeedback from "../CFeedback";

expect.addSnapshotSerializer(enzymeSerializer);

describe('CFeedback Component Tests', () => {

    let wrapper;
    beforeEach(() => {
        wrapper = shallow(<CFeedback id="test" message="You're doing good!"/>);
    });

    it('should be defined', () => {
        expect(wrapper.find('CFeedback')).toBeDefined();
    });

    it('should have only one Form.Control component', () => {
        expect(wrapper.find('#feedback_test').length).toBe(1);
    });

    it('should have a feedback message', () =>{
        expect(wrapper.find('#feedback_test').text()).not.toBe('');
    });

    it('should have all props available', () => {
        let propsAvailable = [
            'as',
            'className',
            'id',
            'type'
        ];
        let propsOfFormControl = Object.keys(wrapper.find('#feedback_test').props());
        propsAvailable.forEach((propAvail, i) => (
            expect(propAvail).toContain(propsOfFormControl[i])
        ));
    });

    describe('Snapshot Testing', () => {
        it('should match snapshot', () => {
            expect(wrapper).toMatchSnapshot();
        })
    });
});