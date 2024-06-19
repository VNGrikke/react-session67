export type FilterType = 'ALL' | 'Đã trả' | 'Chưa trả';

const SET_FILTER = 'SET_FILTER';

export const setFilter = (filter: FilterType) => ({
    type: SET_FILTER as typeof SET_FILTER,
    payload: filter,
});

type FilterAction = ReturnType<typeof setFilter>;

const initialFilterState: FilterType = 'ALL';

const filterReducer = (state: FilterType = initialFilterState, action: FilterAction): FilterType => {
    switch (action.type) {
        case SET_FILTER:
            return action.payload;
        default:
            return state;
    }
};

export default filterReducer;
