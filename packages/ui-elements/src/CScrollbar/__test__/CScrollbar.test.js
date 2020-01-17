import CScrollbar from "../CScrollbar";

expect.addSnapshotSerializer(enzymeSerializer);

describe('CScrollbar Tests', () => {
    let sWrapper, mockFunction,mockFunction1;

    beforeEach(() => {
        mockFunction = jest.fn();
        mockFunction1 = jest.fn();
        sWrapper = shallow(<CScrollbar id="test"
                                       onScroll={mockFunction}
                                       onScrollFrame={mockFunction}
                                       onScrollStart={mockFunction}
                                       onScrollStop={mockFunction}
                                       onUpdate={mockFunction1}/>);
    });

    it('should be defined', () => {
        expect(sWrapper.find('CScrollbar')).toBeDefined();
    });

    it('should contain one Scrollbar component', () => {
        expect(sWrapper.find('#scrollbar_test').length).toBe(1);
    });

    it('should have all props available', () => {
        let propsAvailable = [
            'autoHeight',
            'autoHeightMax',
            'autoHeightMin',
            'autoHide',
            'autoHideDuration',
            'autoHideTimeout',
            'children',
            'className',
            'hideTracksWhenNotNeeded',
            'id',
            'onScroll',
            'onScrollFrame',
            'onScrollStart',
            'onScrollStop',
            'onUpdate',
            'renderThumbHorizontal',
            'renderThumbVertical',
            'renderTrackHorizontal',
            'renderTrackVertical',
            'renderView',
            'style',
            'thumbMinSize',
            'thumbSize',
            'universal',
        ];
        let propsOfScrollbar = Object.keys(sWrapper.find('#scrollbar_test').props());
        propsAvailable.forEach((propAvail, i) => (
            expect(propAvail).toContain(propsOfScrollbar[i])
        ));
    });

    it('should call the mockFunction onScroll Event', () => {
        sWrapper.find('#scrollbar_test').simulate('scroll');
        expect(mockFunction).toHaveBeenCalled();
    });

    it('should call the mockFunction onScrollFrame Event', () => {
        sWrapper.find('#scrollbar_test').simulate('scrollFrame');
        expect(mockFunction).toHaveBeenCalled();
    });

    it('should call the mockFunction onScrollStart Event', () => {
        sWrapper.find('#scrollbar_test').simulate('scrollStart');
        expect(mockFunction).toHaveBeenCalled();
    });

    it('should call the mockFunction onScrollStop Event', () => {
        sWrapper.find('#scrollbar_test').simulate('scrollStop');
        expect(mockFunction).toHaveBeenCalled();
    });

    it('should call the mockFunction1 onUpdate', () => {
        sWrapper.find('#scrollbar_test').simulate('update');
        expect(mockFunction1).toHaveBeenCalled();
    });

    describe('Snapshot Testing', () => {
        it('should match snapshot', () => {
            expect(sWrapper).toMatchSnapshot();
        })
    });
});