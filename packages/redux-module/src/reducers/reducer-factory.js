export const createReducerFactory = (handlers, initialState = {}) => (
    state = initialState,
    action
  ) => {
    const handler = handlers[action.type]
    if (!handler) {
      
      return state;
    }
    const nextState = handler(state, action)
    return nextState
}