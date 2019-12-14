import axios from 'axios';
import store from '../store';
import isEmpty from 'lodash.isempty';
import { addUser } from '../store/actions/user';


export default function getCurrentUser(props) {
  if(isEmpty(store.getState().user)) {
    axios.get('api/getcurrentuser')
    .then((response) => {
      store.dispatch(addUser(response.data));
    })
    .catch((error) =>  {
      const { pathname } = props.location;
      if (pathname !== "/login" && pathname !== "/home" && pathname !== "/registration" ) {
        props.history.push("/home");
      }
    });
  }
}
