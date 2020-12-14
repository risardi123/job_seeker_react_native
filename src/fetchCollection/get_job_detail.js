import Axios from 'axios';
import {fetch_link} from '../Constant/Constant';

const get_job_detail = (id) =>{
  return new Promise((resolve)=>{
    Axios
      .get(`${fetch_link}/positions/${id}.json`)
      .then((user)=>resolve(user))
      .catch((e)=>resolve(e))
  })
}
export default get_job_detail
