## Step1
First Install react-redux and redux-thunk
## Step2
make redux folder : api,reducers,actions,constants
## Step3
api:index.js , constants:actionTypes.js ,reducers:index.js 
## Step4
In reducers:index.js  :
```
import {combineReducers} from 'redux'
import users from './users'
const rootReducer = combineReducers({
users
})
export default rootReducer
```
## Step5: Create a Store and wrap provider component
```
import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import { Provider } from 'react-redux';
import { createStore , applyMiddleware ,compose} from 'redux';
import {thunk} from 'redux-thunk'
import reducers from './redux/reducers'
const root = ReactDOM.createRoot(document.getElementById('root'));
const store = createStore(reducers,compose(applyMiddleware(thunk)))
root.render(
    <React.StrictMode>
    <Provider store={store} >
        <App />
    </Provider>
    </React.StrictMode>
);

// Here we are creating a store and then we are passing that store as a prop in the provider component and after that we are wrapping our provider component to entire application component
```
## Step6: Fetch the API in api:index.js
```
import axios from 'axios'
const API = axios.create({ baseURL:'http://localhost:8800/'})
export const fetchUsers = () => API.get('/get')
```

## Step7: Added action types in constants 
```
export const FETCH_USERS = 'FETCH_USERS'
```

## Step8: Create a action in action:users.js
```
import { fetchUsers } from "../api"
import { FETCH_USERS } from "../constants/actionTypes";

export const getUsers =()=>async(dispatch)=>{
try {
    const { data } = await fetchUsers();
   dispatch({type:FETCH_USERS,payload:data}) 
} catch (error) {
    console.log(error)
}
}
```
## Step9: Create reducers in reducers:users.js
```
import { FETCH_USERS } from "../constants/actionTypes";

export default(users=[],action)=>{
    switch (action.type) {
        case FETCH_USERS:
            return action.payload;
            break;
    
        default:
          return users
    }
}
```
## Step10: Now Use the data from the api in the component you want by importing your lovely action and also useDispatch and useSelector Hook
```
import React, { useEffect } from 'react'
import { useDispatch ,useSelector } from 'react-redux'
import { getUsers } from '../redux/actions/users'
const Users = () => {
    const dispatch = useDispatch();
    const data = useSelector((state)=>state.users);
    useEffect(()=>{
        dispatch(getUsers())
    },[])
    console.log(data)
  return (
    <div>
      
    </div>
  )
}

export default Users

```
