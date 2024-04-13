import axios from "axios";
import {fetchTasks} from "../actions";

export const getTasks = () => {
    return (dispatch) => {
        axios.get('https://expressjs-server.vercel.app/tasks')
            .then(res => {
                dispatch(fetchTasks(res.data))
            })
            .catch(err => {
                alert('Get tasks ERROR')
            })
    }
}

export const postTask = (newTask) => {
    return (dispatch) => {
        axios.post('https://expressjs-server.vercel.app/tasks', newTask)
            .then(res => {
                dispatch(getTasks())})
            .catch(err => {
                console.log(err)
            })
    }
}

export const deleteTask = (taskId) => {
    return (dispatch) => {
        axios.delete(`https://expressjs-server.vercel.app/tasks/${taskId}`)
            .then(res => {
                dispatch(getTasks())
            })
            .catch(err => {
                console.log(err)
            })
    }
}

export const editTask = (task) => {
    return (dispatch) => {
        axios.patch(`https://expressjs-server.vercel.app/tasks/${task._id}`, task)
            .then(res => {
                dispatch(getTasks())
            })
            .catch(err => {
                console.log(err)
            })
    }
}

