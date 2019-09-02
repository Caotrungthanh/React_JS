// console.log("Hello and welcome to Redux");

import { createStore } from 'redux';

var initialState = {
    status : false,
    sort : { by : 'name', value : 1 }
} 

var myReducer = ( state = initialState, action ) =>
{   
    if( action.type === 'TOGGLE_STATUS' )
    {
        state.status = !state.status;
        return state;
    }
    if( action.type === 'SORT_NAME' )
    {
        var { by, value } = action.sort;
        var { status } = state;

        return {
            status : status,
            sort : { by : by, value : value }
        };
    }
    return state;
}

const store = createStore(myReducer);

console.log( 'Default : ',store.getState() );





// Thuc hien cong viec thay doi status
var action = { type : 'TOGGLE_STATUS' };
store.dispatch(action);

console.log( 'TOGGLE_STATUS : ',store.getState() );

//Thuc hien cong viec sap xep name tu Z -> A
var sortAction = { type : 'SORT_NAME', sort : { by : 'name', value : -1 } };

store.dispatch(sortAction);

console.log( 'SORT_NAME : ',store.getState() );

