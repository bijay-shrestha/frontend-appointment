import CButton from '../CButton';

expect.addSnapshotSerializer(enzymeSerializer);
describe('CButton Component', () => {
    let wrapper, wrapper1, mockFunction;
    beforeEach(() => {
        mockFunction = jest.fn();
        wrapper = shallow(<CButton id="c-button" onClickHandler={mockFunction}/>)
        wrapper1 = mount(<CButton id="c-button"/>);

    });
    afterEach(() => {
        wrapper1.unmount()
    })
    it('should be defined', () => {
        expect(wrapper).toBeDefined();
    });

    it('should have only one button', () => {
        expect(wrapper.find('#c-button')).toHaveLength(1);
    });

    it('should have show name of button when props name is given', () => {
        wrapper.setProps({
            name: 'Submit'
        });
        expect(wrapper.find('#c-button').text()).toBe('Submit')
    })

    it('should show default name of button when props name is not given', () => {
        expect(wrapper.find('#c-button').text()).toBe('Save');
    });

    it('should have type button when props type is not given', () => {
        expect(wrapper.find('#c-button').prop('type')).toBe('button');
    });

    it('should have give props available to the button', () => {
        const buttonProps =
            ['id', 'type',
                'active', 'className',
                'children', 'as',
                'block', 'disabled',
                'href', 'size',
                'variant', 'bsPrefix',
                'onClick'];
        const actualButtonProps = Object.keys((wrapper.find('#c-button').props()));
        buttonProps.map((bprop, index) => {
            expect(buttonProps).toContain(actualButtonProps[index]);
        });
    });

    it('should have call the function when the button is clicked', () => {
        wrapper.find('#c-button').simulate('click');
        expect(mockFunction).toHaveBeenCalled();
    });

    describe('Snapshot Testing', () => {
        it('should match snapshot', () => {
            expect(wrapper1).toMatchSnapshot();
        })
    });
});