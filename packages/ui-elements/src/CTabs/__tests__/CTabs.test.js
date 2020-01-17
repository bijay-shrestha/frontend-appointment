import CTabs from '../CTabs';
import Tabs from "react-bootstrap/Tabs";
import React from "react";

expect.addSnapshotSerializer(enzymeSerializer);

describe('CTabs Tests', () => {
    let wrapper;
    const dataForTab = [
        {
            id: "1",
            name: "Add",
            icon: "fa fa-plus-circle",
            component: "",
            eventKey: "/generalSetup/adminSetup/add",
        },
        {
            id: "2",
            name: "Manage",
            icon: "fa fa-clipboard",
            component: "",
            eventKey: "/generalSetup/adminSetup/manage",
        }
    ];

    describe('Tabs Component Tests', () => {

        beforeEach(() => {
                wrapper = shallow(<CTabs.WrappedComponent data={[]}/>);
            }
        );

        test('if CTabs is defined', () => {
            expect(wrapper.find('CTabs')).toBeDefined();
        });

        test('if Tabs Component is defined', () => {
            expect(wrapper.find('Tabs')).toBeDefined();
        });

        test('if Tabs Component contains all required props', () => {
            let propsRequired = [
                'id',
                'activeKey',
                'mountOnEnter',
                'transition',
                'unmountOnExit',
                'variant',
                'onSelect'
            ];
            let propsAvailable = Object.keys(wrapper.find(Tabs).props());
            propsRequired.forEach((propsReq, i) => (
                expect(propsReq).toContain(propsAvailable[i])
            ));
        });

    });

    describe('State Tests', () => {
        let instance;

        beforeEach(() => {
                wrapper = mount(<CTabs.WrappedComponent data={dataForTab}/>);
                instance = wrapper.instance();
            }
        );

        afterAll(() => {
            wrapper.unmount();
        });

        test('if state is defined and has property `activeTabKey`', () => {
            expect(wrapper.state('activeTabKey')).toBeDefined();
        });

        test('if Tabs Component`s prop `activeKey` is assigned state`s activeTabKey value', () => {
            expect(wrapper.find(Tabs).prop('activeKey')).toEqual(wrapper.state('activeTabKey'));
        });

        test('if state`s property activeTabKey is assigned value on component did mount', () => {
            wrapper.setProps({
                location: {
                    pathname: '/add'
                }
            });
            instance.componentDidMount();
            expect(wrapper.state('activeTabKey')).not.toBe('');
        });

        test('if componentDidUpdate lifecycle will be called and state changed on url change', () => {
            instance.componentDidUpdate({
                location: {
                    pathname: '/'
                },
                history: {
                    location: {
                        pathname: '/manage'
                    }
                }
            });
            wrapper.update();
            expect(wrapper.state('activeTabKey')).toBe('/manage');

        });

        describe('Tab select tests', () => {
            let onSelectMock;
            const pathChanged = "/manage";

            beforeEach(() => {
                    onSelectMock = jest.spyOn(instance, 'handleTabSelect');
                    wrapper.update();
                    wrapper.find('Tabs').prop('onSelect')(pathChanged);
                }
            );

            afterAll(() => {
                wrapper.unmount();
            });

            test('if calls select handler function on tab select', () => {
                expect(onSelectMock).toHaveBeenCalled();
            });

            test('if updates state on tab select', () => {
                expect(wrapper.state('activeTabKey')).toBe(pathChanged);
            });
        });

    });

    describe('Tab Component Test', () => {

        beforeEach(() =>
            wrapper = shallow(<CTabs.WrappedComponent data={dataForTab}/>)
        );

        test('if renders at least one `Tab` component', () => {
            expect(wrapper.find('Tab').length).toBeGreaterThanOrEqual(1);
        });

        test('if tab component contains required prop', () => {
            let propsRequired = [
                'id',
                'title',
                'eventKey'
            ];

            let propsAvailable = Object.keys(wrapper.find('#tab_1').props());
            propsRequired.forEach((propsReq, i) => (
                expect(propsReq).toContain(propsAvailable[i])
            ));
        });

    });

    describe('Snapshot Test', () => {
        wrapper = shallow(<CTabs data={dataForTab}/>);
        test('if renders CTab correctly', () => {
            expect(wrapper).toMatchSnapshot();
        });
    });
});