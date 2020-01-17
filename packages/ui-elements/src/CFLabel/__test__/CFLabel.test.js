import CFLabel from "../CFLabel";

expect.addSnapshotSerializer(enzymeSerializer);

describe('CFLabel Component Tests', () => {

    let wrapper;
    beforeEach(() => {
        wrapper = shallow(<CFLabel id="test" labelName="test"/>);
    });

    it('should be defined', () => {
        expect(wrapper.find('CFLabel')).toBeDefined();
    });

    it('should have only one Form.Label component', () => {
        expect(wrapper.find('#label_test').length).toBe(1);
    });

    it('should have a name', () => {
        expect(wrapper.find('#label_test').text()).not.toBe("");
    });

    it('should have all props available', () => {
        let propRequired = [
            '_ref',
            'as',
            'bsPrefix',
            'className',
            'column',
            'htmlFor',
            'id',
            'srOnly'
        ];
        let propsOfFormLabel = Object.keys(wrapper.find('#label_test').props());
        propRequired.forEach((propAvail, i) => (
            expect(propAvail).toContain(propsOfFormLabel[i])
        ));
    });

    it('should pass `sm`,`md`,`lg` and `xl` props only when column prop is passed with boolean value true', () => {
        const colProps = [
            {sm: 4},
            {md: 4},
            {lg: 4},
            {xl: 4}];
        wrapper.setProps({
            column: true
        });
        colProps.forEach(colProp => {
            wrapper.setProps({
                ...colProp
            });
            expect(wrapper.find('#label_test').prop(Object.keys(colProp)[0])).toBe(4);
        });
    });

    describe('Snapshot Testing', () => {
        it('should match snapshot', () => {
            expect(wrapper).toMatchSnapshot();
        })
    });
});