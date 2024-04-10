export const fetchStatuses = (statuses) => {
    return {
        type: 'GET_STATUSES',
        payload: statuses,
    }
}

export const fetchTasks = (tasks) => {
    return {
        type: 'GET_TASKS',
        payload: tasks,
    }
}

