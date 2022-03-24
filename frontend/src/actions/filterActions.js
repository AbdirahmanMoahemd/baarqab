import axios from 'axios';
import {
  
  PRODUCT_LIST_FAIL, PRODUCT_LIST_FAIL2, PRODUCT_LIST_REQUEST, PRODUCT_LIST_REQUEST2, PRODUCT_LIST_SUCCESS, 
  PRODUCT_LIST_SUCCESS2, 
} from '../constants/productConstants'

// export const getNewArrivals =
// 	(sortBy = 'desc', limit = 3) =>
// 	async dispatch => {
// 		try {
// 			dispatch({ type: START_LOADING });
// 			const response = await axios.get(
// 				`/api/filter?sortBy=${sortBy}&limit=${limit}`
// 			);
// 			dispatch({ type: STOP_LOADING });
// 			dispatch({
// 				type: GET_NEW_ARRIVALS,
// 				payload: response.data.newArrivals,
// 			});
// 		} catch (err) {
// 			console.log('getNewProducts api error: ', err);
// 			dispatch({ type: STOP_LOADING });
// 			dispatch({
// 				type: SHOW_ERROR_MESSAGE,
// 				payload: err.response.data.errorMessage,
// 			});
// 		}
// 	};

export const getProductsByFilter = (arg) => async (dispatch) => {
	try {
		dispatch({ type: PRODUCT_LIST_REQUEST })
		const { data } = await axios.post('/api/filter/search', arg);

		dispatch({
			type: PRODUCT_LIST_SUCCESS,
			payload: data,
		});
	} catch (error) {
        dispatch({
            type: PRODUCT_LIST_FAIL,
            payload: error.response && error.response.data.message ?
                error.response.data.message :
                error.message,
       })  
    }
};
