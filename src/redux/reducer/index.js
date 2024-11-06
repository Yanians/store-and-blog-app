import {
    products,
    categories, 
    blogs, 
     } from '../../imgroute';

    import {
      TableStore,
      Record,
    } from './reducer';

   import { combineReducers } from 'redux';

   export { 
      Increase,
      Decrease, 
      insertItems, 
      deleteItem, 
      deleteAll, 
      RegisteredInfo,
      MessageCount,
   } from './action';
   
   const rootReducer = combineReducers({
         TableStore,
         Record,
   });
   
   export default rootReducer;