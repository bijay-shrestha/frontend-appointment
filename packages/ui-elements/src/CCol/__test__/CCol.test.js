import CCol from "../CCol";

describe('CCol Component Tests', () => {

    let wrapper;
    beforeEach(() => {
        wrapper = shallow(<CCol id="test"/>);
    });

    it('should be defined', () => {
        expect(wrapper.find('CCol')).toBeDefined();
    });

    it('should have only one Form.Row component', () => {
        expect(wrapper.find('#col_test').length).toBe(1);
    });

    it('should have all props available', () => {
        let propsAvailable = [
            'as',
            'bsPrefix',
            'children',
            'className',
            'id',
            'lg',
            'md',
            'sm',
            'xl',
            'xs'
        ];
        let propsOfCol = Object.keys(wrapper.find('#col_test').props());
        propsAvailable.forEach((propAvail, i) => (
            expect(propAvail).toContain(propsOfCol[i])
        ));
    });

    describe('Snapshot Testing', () => {
        it('should match snapshot', () => {
            expect(wrapper).toMatchSnapshot();
        })
    });

});