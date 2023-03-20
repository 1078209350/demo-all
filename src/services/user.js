//services/user.js
import request from '../utils/request';
let getUser = function() {
  return request('http://127.0.0.1:3002')
}
export default  getUser
