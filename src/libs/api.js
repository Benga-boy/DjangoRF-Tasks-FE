import axios from 'axios'

const tasksUrl = 'http://127.0.0.1:8000/api'


// * Function to get all tasks
export const getTasks =  () => {
  return axios.get(`${tasksUrl}/task-list/`)
}

export const newTask = task => {
  return axios.post(`${tasksUrl}/task-create/`, task)
}
  

export const taskDelete = id => {
  return axios.delete(`${tasksUrl}/task-delete/${id}`)
}

export const taskUpdate = (id, task) => {
  return axios.put(`${tasksUrl}/task-update/${id}`, task)
}
