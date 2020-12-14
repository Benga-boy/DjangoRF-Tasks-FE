import { ACTIVE_TASK, ADD_TASK, COMPLETE_TASK, DELETE_TASK, EDITACTIVE_TASK, ERROR, GET_TASKS, UPDATE_TASK } from './types'



export const getAllTasks = data => {
  return {
    type: GET_TASKS,
    payload: data,
  }
}


export const addTask = task => {
  return {
    type: ADD_TASK,
    payload: task,
  }
}

export const deleteTask = id => {
  return {
    type: DELETE_TASK,
    payload: id,
  }
}

export const completeATask = task => {
  return {
    type: COMPLETE_TASK,
    payload: task,
  }
}

export const updateTask = task => {
  return {
    type: UPDATE_TASK,
    payload: task,
  }
}

export const addActiveItem = text => {
  return {
    type: ACTIVE_TASK,
    payload: text,
  }
}

export const editActiveItem = task => {
  return {
    type: EDITACTIVE_TASK,
    payload: task,
  }
}

export const setError = text => {
  return {
    type: ERROR,
    payload: text,
  }
}

