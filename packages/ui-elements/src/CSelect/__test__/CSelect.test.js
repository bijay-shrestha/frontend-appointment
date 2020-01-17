import CSelect from '../CSelect';
import checkPropTypes from 'check-prop-types';

describe('CSelect tests', () => {
    let sWrapper, mockFunction;
    const optionsArr = [
        {value: 1, label: 'Chocolate'},
        {value: 'strawberry', label: 'Strawberry'},
        {value: 'vanilla', label: 'Vanilla'},
    ];

    describe('CSelect Component tests', () => {

        beforeEach(() => {
            mockFunction = jest.fn();
            sWrapper = shallow(<CSelect id="1" options={optionsArr} onChange={mockFunction}/>);
        });

        test('if CSelect component is defined', () => {
            expect(sWrapper).toBeDefined();
        });

        test('if Select component is defined', () => {
            expect(sWrapper.find('#select1').length).toEqual(1);
        });

        test('if Select component has options prop', () => {
            expect(sWrapper.find('#select1').prop('options')).toBeDefined();
        });

        test('if `options` prop is array of Object with properties `value` and `label`', () => {
            let result = checkPropTypes(CSelect.propTypes, {
                options: optionsArr,
                onChange: mockFunction
            }, 'prop', CSelect.name);
            expect(result).toBeUndefined();
        });

        test('if select component has all required props', () => {
            let propRequired = [
                'autoFocus',
                'backspaceRemovesValue',
                'blurInputOnSelect',
                'captureMenuScroll',
                'className',
                'classNamePrefix',
                'closeMenuOnScroll',
                'closeMenuOnSelect',
                'components',
                'defaultInputValue',
                'defaultMenuIsOpen',
                'defaultValue',
                'delimiter',
                'escapeClearsValue',
                'hideSelectedOptions',
                'id',
                'inputId',
                'inputValue',
                'isClearable',
                'isDisabled',
                'isLoading',
                'isMulti',
                'isOptionDisabled',
                'isOptionSelected',
                'isRtl',
                'isSearchable',
                'maxMenuHeight',
                'menuIsOpen',
                'menuPlacement',
                'menuPosition',
                'minMenuHeight',
                'name',
                'noOptionsMessage',
                'onChange',
                'onInputChange',
                'onKeyDown',
                'onMenuClose',
                'onMenuOpen',
                'openMenuOnClick',
                'options',
                'pageSize',
                'placeholder',
                'styles',
                'theme',
                'value',
            ];

            let propsOfSelect = Object.keys(sWrapper.find('#select1').props());
            propRequired.forEach((propAvail, i) => (
                expect(propAvail).toContain(propsOfSelect[i])
            ));
        });

        test('if calls mock function onChange of value', () => {
            sWrapper.find('#select1').simulate('change');
            expect(mockFunction).toHaveBeenCalled();
        });

    });

});