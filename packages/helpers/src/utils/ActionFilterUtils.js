export const checkIfRoleExists = (filteredActions, actionId) =>
    filteredActions && filteredActions.find(action => action.id === actionId);
