import React, { Fragment, useEffect, useReducer } from 'react'
import reducer, { initialState } from './state/reducer'
import { addActiveItem, addTask, deleteTask, editActiveItem, getAllTasks, completeATask, updateTask, setError } from './state/action'
import { getTasks, newTask, taskDelete, taskUpdate } from './libs/api'

const App = () => {
  const [state, dispatch] = useReducer(reducer, initialState)


  useEffect(() => {
    // * Fetch tasks data from API then dispatch getAllTasks with result
    const taskData = async () => {
      try {
        const res = await getTasks()
        dispatch(getAllTasks(res.data))
      } catch (err) {
        console.log(err)
      }
    }
    taskData()
  }, [])

  // * Handle change function
  const handleChange = (e) => {
    dispatch(addActiveItem(e.target.value))
  }

  // * State destructuring!
  const { tasks, activeItem, editing, error } = state

  // * Handle submit function
  const handleSubmit = async (e) => {
    e.preventDefault()

    if (!editing) {
      if (activeItem.title.trim() !== '') {
        try {
          const res = await newTask({
            title: activeItem.title.trim(),
          })
          dispatch(addActiveItem(''))
          dispatch(setError(''))
          dispatch(addTask(res.data))
        } catch (err) {
          console.log(err.message)
        }
      } else {
        dispatch(setError('Please add a task into the input field'))
      }
    } else if (editing) {
      const res = await taskUpdate(activeItem.id, {
        title: activeItem.title,
      })
      dispatch(updateTask(res.data))
      dispatch(editActiveItem({
        id: null, title: '', completed: false,
      }))
    }

  }

  // * Function to handle task completion
  const markCompletion = async (task) => {
    task.completed = !task.completed
    try {
      await taskUpdate(task.id, {
        completed: task.completed,
        title: task.title,
      })
      dispatch(completeATask(task))
    } catch (err) {
      console.log(err)
    }
  }

  // * Function to delete a Task
  const deleteHandler = async task => {
    try {
      await taskDelete(task.id)
      dispatch(deleteTask(task.id))
    } catch (err) {
      console.log(err)
    }
  }

  // * Function to edit task
  const editTaskHandler = task => {
    dispatch(editActiveItem(task))
  }

  return (
    <Fragment>
      <div className="container">
        <div id="task-container">
          <div id="form-wrapper">
            <form onSubmit={handleSubmit} id="form">
              <div className="flex-wrapper">
                <div style={{ flex: 6 }}>
                  <input
                    className="form-control"
                    value={activeItem.title}
                    onChange={handleChange}
                    id="title"
                    type="text"
                    name="title"
                    placeholder="Add task.."
                  />
                </div>

                <div style={{ flex: 1 }}>
                  <input
                    id="submit"
                    className="btn btn-warning"
                    type="submit"
                    name="Add"
                  />
                </div>
              </div>
            </form>
            { error ? 
              <div style={{ flex: 6 }} >
                <small className="error"> {error} </small>
              </div> : ''
            }
          </div>

          <div id="list-wrapper">
            {tasks.length > 0 ? (
              <Fragment>
                {tasks.map((task) => (
                  <div key={task.id} className="task-wrapper flex-wrapper">
                    <div
                      onClick={() => markCompletion(task)}
                      style={{ flex: 7 }}
                    >
                      {task.completed === false ? (
                        <span>{task.title}</span>
                      ) : (
                        <s>{task.title}</s>
                      )}
                    </div>
                    
                    <div style={{ flex: 1 }}>
                      {!task.completed &&
                        <button onClick={() => editTaskHandler(task)} className="btn btn-sm btn-outline-info">
                        Edit
                        </button>
                      }
                    </div>

                    <div style={{ flex: 1 }} >
                      <button onClick={() => deleteHandler(task)} className="btn btn-sm btn-outline-dark delete">
                        Delete
                      </button>
                    </div>

                  </div>
                ))}
              </Fragment>
            ) : <Fragment>
              <h4>
                Your Task(s) list is empty. Please start adding tasks above
              </h4>
            </Fragment>}
          </div>
        </div>
      </div>
    </Fragment>
  )
}

export default App
