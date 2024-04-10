import './App.css';
import {useEffect, useState} from "react";
import {useDispatch, useSelector} from "react-redux";
import {getStatuses} from "./API/statusesServices";
import {postTask} from "./API/tasksServices";
import {Button, Container, Form, InputGroup, Row} from "react-bootstrap";
import Columns from "./Columns";


function App() {

    const status = ['To do', 'In progress', 'Review', 'Done']
    const priority = ['1', '2', '3', '4', '5', '6', '7', '8', '9', '10'];


    const dispatch = useDispatch()
    const statuses = useSelector(state => state.statuses)

    const [newTaskName, setNewTaskName] = useState('')
    const [newTaskPriority, setNewTaskPriority] = useState('')
    const [newTaskStatus, setNewTaskStatus] = useState('')
    const [newTaskDescription, setNewTaskDescription] = useState('')
    const [addModeOn, setAddModeOn] = useState(false)


    useEffect(() => {
        dispatch(getStatuses())
    }, [])


    const createTask = (name, description, status, priority) => {
        dispatch(postTask({
            name: name,
            description: description,
            status: status,
            priority: priority,
        }))
        setNewTaskName('')
        setNewTaskPriority('')
        setNewTaskStatus('')
        setNewTaskDescription('')
        setAddModeOn(false)
    }


    return (
        <Container className="App">

            <h1>Kanban V-2</h1>
            <hr/>

            {addModeOn ?

                (<div>


                        <div>
                            <InputGroup className="mb-3">
                                <InputGroup.Text id="inputGroup-sizing-default">New Task</InputGroup.Text>
                                <Form.Control
                                    aria-label="New task"
                                    aria-describedby="inputGroup-sizing-default"
                                    style={{boxShadow: 'none'}}
                                    value={newTaskName}
                                    onChange={(e) => setNewTaskName(e.target.value)}
                                />
                            </InputGroup>

                            <InputGroup className="mb-3">
                                <InputGroup.Text id="inputGroup-sizing-default">
                                    Description
                                </InputGroup.Text>
                                <Form.Control
                                    aria-label="Description"
                                    aria-describedby="inputGroup-sizing-default"
                                    style={{boxShadow: 'none'}}
                                    value={newTaskDescription}
                                    onChange={(e) => {
                                        setNewTaskDescription(e.target.value)
                                    }}

                                />
                            </InputGroup>
                            <br/>

                            <div className="d-flex justify-content-around">

                                <Form.Select
                                    aria-label="Default select example"
                                    value={newTaskStatus}
                                    onChange={(e) => setNewTaskStatus(e.target.value)}
                                    className="m-3 shadow-sm"
                                >
                                    <option>Choose status</option>
                                    {status.map((el, index) =>
                                        <option
                                            key={index}
                                            value={el}
                                        >{el}</option>
                                    )}
                                </Form.Select>

                                <Form.Select
                                    aria-label="Default select example"
                                    value={newTaskPriority}
                                    onChange={(e) => setNewTaskPriority(e.target.value)}
                                    className="m-3 shadow-sm"
                                >
                                    <option>Choose priority</option>
                                    {priority.map((el, index) =>
                                        <option
                                            key={index}
                                            value={el}
                                        >{el}</option>
                                    )}
                                </Form.Select>

                            </div>

                        </div>

                        <Button
                            variant="outline-danger"
                            className='button'
                            onClick={() => createTask(newTaskName, newTaskDescription, newTaskStatus, newTaskPriority)}

                        >
                            ok
                        </Button>

                        <Button
                            variant="outline-danger"
                            className='button'
                            onClick={() => setAddModeOn(false)}

                        >
                            Cancel
                        </Button>
                    </div>
                ) : (


                    <Button
                        onClick={() => setAddModeOn(true)}
                    >add new task</Button>
                )}
            <Container>

                <Row>

                    {statuses.map(status =>
                        <Columns
                            key={status.id}
                            column={status}
                        />
                    )}

                </Row>

            </Container>

        </Container>
    );
}

export default App;
