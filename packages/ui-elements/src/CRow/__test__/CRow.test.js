import CRow from "../CRow";

expect.addSnapshotSerializer(enzymeSerializer);

describe('CRow Component Tests', () => {

    let wrapper;
    beforeEach(() => {
        wrapper = shallow(<CRow id="test"/>);
    });

    it('should be defined', () => {
        expect(wrapper.find('CRow')).toBeDefined();
    });

    it('should have only one Form.Row component', () => {
        expect(wrapper.find('#row_test').length).toBe(1);
    });

    it('should have all props available', () => {
        let propsAvailable = [
            'as',
            'bsPrefix',
            'children',
            'className',
            'id',
            'noGutters'
        ];
        let propsOfCrow = Object.keys(wrapper.find('#row_test').props());
        propsAvailable.forEach((propAvail, i) => (
            expect(propAvail).toContain(propsOfCrow[i])
        ));
    });

    describe('Snapshot Testing', () => {
        it('should match snapshot', () => {
            expect(wrapper).toMatchSnapshot();
        })
    });
});