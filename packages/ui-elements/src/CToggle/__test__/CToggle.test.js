import CToggle from '../CToggle';

expect.addSnapshotSerializer(enzymeSerializer);
describe('CToggle Component', () => {
    let wrapper, children, mock;
    beforeEach(() => {
        mock = jest.fn();
        wrapper = shallow(<CToggle id="c-toggle" onChangeHandler={mock}/>);
        children = wrapper.find('#c-toggle');
    });

    it('should be defined', () => {
        expect(wrapper).toBeDefined();
    });

    it('should have only one toggle button', () => {
        expect(children).toHaveLength(1);
    });

    it('should have given props available', () => {
        const propsForToggle = ['id', 'name', 'className',
            'onlabel', 'offlabel', 'size', 'onstyle',
            'offstyle', 'width', 'height', 'style',
            'onChange', 'required', 'checked'];
        const propsForToggleAvailable = Object.keys(children.props());
        propsForToggle.map((propToggle, index) => {
            expect(propsForToggle).toContain(propsForToggleAvailable[index]);
        });
    });

    it('should provide default props when the props is not available', () => {
        expect(children.prop('checked')).toBeFalsy();
        expect(children.prop('id')).toBe('c-toggle');
        expect(children.prop('name')).toBe('c-toggle');
        expect(typeof children.prop('onChange')).toBe('function');
    });

    it('should provide the props to the component when props is given', () => {
        wrapper.setProps({
            checked: true,
            id: 'c-toggle1',
            name: 'c-toggle1',
            onChange: jest.fn()
        });
        const children1 = wrapper.find('#c-toggle1');
        expect(children1.prop('checked')).toBeTruthy();
        expect(children1.prop('id')).toBe('c-toggle1');
        expect(children1.prop('name')).toBe('c-toggle1');
        expect(typeof children1.prop('onChange')).toBe('function');
    });

    it('should simulate change when the switch button is change', () => {
        children.simulate('change', {target: {name: 'c-toggle', value: true}});
        expect(mock).toHaveBeenCalled();
    });

    describe('Snapshot Testing', () => {
        it('should match previous snapshot', () => {
            expect(wrapper).toMatchSnapshot();
        });
    });
});