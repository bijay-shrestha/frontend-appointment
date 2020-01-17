import CFRow from "../CFRow";

expect.addSnapshotSerializer(enzymeSerializer);

describe('CFRow Component Tests', () => {

    let wrapper;
    beforeEach(() => {
        wrapper = shallow(<CFRow id="test"/>);
    });

    it('should be defined', () => {
        expect(wrapper.find('CFRow')).toBeDefined();
    });

    it('should have only one Form.Row component', () => {
        expect(wrapper.find('#fRow_test').length).toBe(1);
    });

    it('should have all props available', () => {
        let propsAvailable = [
            'as',
            'bsPrefix',
            'children',
            'className',
            'id'
        ];
        let propsOfCrow = Object.keys(wrapper.find('#fRow_test').props());
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