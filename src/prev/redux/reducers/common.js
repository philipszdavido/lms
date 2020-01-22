
const defaultState = {
  appName: 'ReactApp',
  modalMode: false
};

export default (state = defaultState, action) => {
  switch (action.type) {
    case 'TOGGLE_MODAL':
    console.log(`toggling modal: ${action.modalMode}`)
    return {
      ...defaultState,
      modalMode: action.modalMode
    }
    case 'CHG_APP_NAME':
    alert(action.appName)
    return {
      ...defaultState,
      appName: action.appName
    }
    default:
      return state;
  }
};
