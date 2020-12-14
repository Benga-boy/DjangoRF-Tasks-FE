import { ACTIVE_TASK, ADD_TASK, COMPLETE_TASK, DELETE_TASK, EDITACTIVE_TASK, ERROR, GET_TASKS, UPDATE_TASK } from './types'


export const initialState = { tasks: [], activeItem: { id: null, title: '', completed: false }, editing: false, loading: true, error: '' }


const reducer = (state = initialState, action) => {
  switch (action.type) {
    case GET_TASKS:
      return {
        ...state,
        loading: false,
        tasks: action.payload,
      }

    case ACTIVE_TASK:
      return {
        ...state,
        activeItem: { ...state.activeItem, title: action.payload },
      }
    
    case ADD_TASK:
      return {
        ...state,
        tasks: [action.payload, ...state.tasks],
        loading: false,
      }

    case UPDATE_TASK:
      return {
        ...state,
        tasks: state.tasks.map(task => task.id === action.payload.id ? { ...task, title: action.payload.title } : task),
      }

    case COMPLETE_TASK:
      return {
        ...state,
        tasks: state.tasks.map(task => task.id === action.payload.id ? { ...task, completed: action.payload.completed } : task),
      }

    case EDITACTIVE_TASK:
      return {
        ...state,
        editing: true,
        activeItem: action.payload,
      }

    case DELETE_TASK:
      return {
        ...state,
        tasks: state.tasks.filter(task => task.id !== action.payload),
      }

    case ERROR: {
      return {
        ...state,
        error: action.payload,
      }
    }

    default:
      return state
    
  }
}

export default reducer