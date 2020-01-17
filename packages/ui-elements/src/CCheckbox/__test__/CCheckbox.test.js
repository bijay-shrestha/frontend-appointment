import CCheckbox from '../CCheckbox';

expect.addSnapshotSerializer(enzymeSerializer);

describe('CCheckbox Tests', () => {
    let sWrapper, mockFunction;
    beforeEach(() => {
        mockFunction = jest.fn();
        sWrapper = shallow(<CCheckbox
            id="checkbox_1"
            label="checkItBaby"
            onChange={mockFunction}/>);
    });

    test('if CCheckbox is defined', () => {
        expect(sWrapper).toBeDefined();
    });

    test('if has one Form.Check checkbox element', () => {
        expect(sWrapper.find('[testModule-id="c-checkbox"]').length).toEqual(1);
    });

    test('if has type as checkbox', () => {
        expect(sWrapper.find('[testModule-id="c-checkbox"]').prop('type')).toEqual('checkbox');
    });

    test('if has label with value', () => {
        sWrapper.setProps({
            label: 'CheckItBaby'
        });
        expect(sWrapper.find('[testModule-id="c-checkbox"]').prop('label')).not.toBe("");
    });

    test('if checkbox has all required props', () => {
        let propRequired = [
            'testModule-id',
            'id',
            'label',
            'type',
            '_ref',
            'checked',
            'children',
            'className',
            'custom',
            'disabled',
            'feedback',
            'inline',
            'isInvalid',
            'isValid',
            'title',
            'bsPrefix',
            'onChange'
        ];

        let propsOfCheckbox = Object.keys(sWrapper.find('[testModule-id="c-checkbox"]').props());
        propRequired.forEach((propAvail, i) => (
            expect(propAvail).toContain(propsOfCheckbox[i])
        ));
    });

    test('if onCheckHandler function is called when checked', () => {
        sWrapper.find('[testModule-id="c-checkbox"]').simulate('change');
        expect(mockFunction).toHaveBeenCalled();
    });

    describe('Snapshot Testing', () => {
        it('should match snapshot', () => {
            expect(sWrapper).toMatchSnapshot();
        })
    });

});
