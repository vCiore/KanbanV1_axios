import {Col} from "react-bootstrap";
import Task from "./Task";
import {useDispatch, useSelector} from "react-redux";
import {useEffect} from "react";
import {getTasks} from "./API/tasksServices";

const Columns = ({column}) => {

    const dispatch = useDispatch()
    const tasks = useSelector(state => state.tasks)

    useEffect(() => {
        dispatch(getTasks())
    }, [])


    return (

        <Col
            align={'center'}
            style={{fontWeight: 'bolder'}}
        >

            <h3>{column.title}</h3>
            <hr/>

            {tasks.filter(task => task.status === column.status)
                .sort((a, b) => +b.priority - +a.priority)
                .map(task =>(
                    <Task
                        key={task.id}
                        task={task}
                        getTasks={getTasks}
                    />

                ))
            }

        </Col>

    );
};

export default Columns;