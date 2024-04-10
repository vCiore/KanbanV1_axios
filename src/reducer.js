 const initialState = {
    statuses : [],
     tasks: []
 }

 const kanbanReducer = (state= initialState, action) => {
    switch(action.type) {
        case 'GET_STATUSES':
            return {...state, statuses: action.payload}
        case 'GET_TASKS':
            return {...state, tasks: action.payload}
        default: return state
    }
 }

 export default  kanbanReducer;