import Axios from 'axios';
import {fetch_link} from '../Constant/Constant';

const get_job_list = ({page, search, fullTime,  location}) =>{
  const searchValue = search ? `&search=${search}` : ""
  const fullTimeValue = fullTime ? `&type=Full Time` : ""
  const locationValue = location ? `&location=${location}` : ""
  console.warn(`${fetch_link}/positions.json?page=${page}${searchValue}${fullTimeValue}${locationValue}`)
  return new Promise((resolve)=>{
    Axios
      .get(`${fetch_link}/positions.json?page=${page}${searchValue}${fullTimeValue}${locationValue}`)
      .then((user)=>resolve(user))
      .catch((e)=>resolve(e))
  })
}
export default get_job_list
