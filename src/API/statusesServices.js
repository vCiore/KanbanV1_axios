import axios from "axios";
import {fetchStatuses} from "../actions";

export const getStatuses = () => {
    return (dispatch) => {
       axios.get('https://expressjs-server.vercel.app/statuses')
           .then(res => {
               dispatch(fetchStatuses(res.data))
           })
           .catch(err => {
               alert('Get statuses ERROR')
           })
    }
}