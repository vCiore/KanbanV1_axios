import {Button, Card, CardBody, CardFooter, CardSubtitle, CardTitle, FormControl} from "react-bootstrap";
import {ArrowDown, ArrowLeft, ArrowRight, ArrowUp, Pencil, TrashFill} from "react-bootstrap-icons";
import {useState} from "react";
import {deleteTask, editTask} from "./API/tasksServices";
import {useDispatch, useSelector} from "react-redux";


const Task = ({task}) => {

    const [editModeOn, setEditModeOn] = useState(false)
    const [newNameTask, setNewNameTask] = useState(task.name)
    const dispatch = useDispatch()
    const statuses = useSelector(state => state.statuses)
    const status1 = statuses.map(el => el.status)


    const deleteTaskById = (taskId) => {
        dispatch(deleteTask (taskId))
    }

    const editTaskName = (NewNameTask, task) => {
        task = {...task, name: newNameTask}
        dispatch(editTask(task))
        setEditModeOn(false)
    }

    const editTaskPriority = (task, direction) => {
        if (direction === 'up') { task = {...task, priority: +task.priority + 1} }
        if (direction === 'down') { task = {...task, priority: +task.priority - 1} }
        dispatch(editTask(task))
    }

    const editTaskStatus = (task, direction) => {
        if (direction === 'left') {
            task = {...task, status: status1[status1.indexOf(task.status) - 1] }
        }
        if (direction === 'right') {
            task = {...task, status: status1[status1.indexOf(task.status) + 1] }
        }
        dispatch(editTask(task))
    }


    return (
        <Card style={{ width: '18rem', paddingBottom: '5px', marginBottom: '10px' }}>
            <CardBody>

                <div style={{display:'flex', justifyContent: 'space-between', alignItems: 'center'}}>

                    <div>

                        <CardTitle>
                            <h2>{task.name}</h2>
                        </CardTitle>

                        <CardSubtitle>
                            <h5
                                style={{fontWeight: 'bold'}}
                            >
                                Description:
                            </h5>
                            <span>{task.description}</span>
                        </CardSubtitle>
                    </div>
                    <div style={{display:'flex', flexDirection: 'column'}}>
                        {task.priority >= 1 && task.priority <= 9 && (
                            <Button
                                variant="outline-success"
                                onClick={() => editTaskPriority(task, 'up')}
                            >
                                <ArrowUp />
                            </Button>
                        )}
                        {task.priority}
                        {task.priority >= 2 && task.priority <= 10 &&
                            (<Button
                                    variant="outline-success"
                                    onClick={() => editTaskPriority(task, 'down')}
                                >
                                    <ArrowDown />
                                </Button>
                            )}
                    </div>

                </div>


                <div style={{display: 'flex', justifyContent:'space-around', alignItems: 'center'}}>
                    { task.status !== 'todo' &&
                        (<Button
                            className='button'
                            variant="outline-success"
                            onClick={() => editTaskStatus(task,'left')}
                        >
                            <ArrowLeft />
                        </Button>)}

                    { task.status !== 'finish' &&
                        ( <Button
                            className='button'
                            variant="outline-success"
                            onClick={() => editTaskStatus(task,'right')}
                        >
                            <ArrowRight />
                        </Button>)}

                </div>

                <CardFooter >
                    {editModeOn ? (
                        <div>
                            <FormControl
                                placeholder='New Task name'
                                value={newNameTask}
                                onChange = {(e) => setNewNameTask(e.target.value)}
                            />
                            <Button
                                variant='outline-danger'
                                className='button'
                               onClick={() =>editTaskName(newNameTask, task)}
                            >
                                ok
                            </Button>

                            <Button
                                variant='outline-danger'
                                onClick={() => setEditModeOn(false)}
                                className='button'
                            >
                                cancel
                            </Button>

                        </div>

                    ) : (
                        <div style={{display: 'flex', justifyContent:'space-around', alignItems: 'center'}}>
                            <Button
                                variant="outline-danger"
                                onClick={() => setEditModeOn(true)}
                            >
                                <Pencil />
                            </Button>



                            <Button
                                variant="outline-danger"
                                onClick={() => deleteTaskById(task._id)}
                            >
                                <TrashFill/>
                            </Button>
                        </div>
                    )}
                </CardFooter>

            </CardBody>
        </Card>
    );
};

export default Task;