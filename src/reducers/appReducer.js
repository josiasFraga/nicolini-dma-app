//import IMAGES from "@constants/images";

const INITIAL_STATE = {
  is_logging_in: false,
  is_loading_goods: false,
  is_loading_cutout_codes: false,
  is_loading_expected_yield: false,
  saidas: [],
};

export const appReducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
  
    case 'LOGIN':
		return {...state, is_logging_in: true};
    case 'LOGIN_SUCCESS':
		return {...state, is_logging_in: false};
    case 'LOGIN_FAILED':
		return {...state, is_logging_in: false};
  
    case 'LOAD_GOODS':
		return {...state, is_loading_goods: true};
    case 'LOAD_GOODS_SUCCESS':
		return {...state, is_loading_goods: false };
    case 'LOAD_GOODS_FAILED':
		return {...state, is_loading_goods: false};
  
    case 'LOAD_CUTOUT_CODES':
		return {...state, is_loading_cutout_codes: true};
    case 'LOAD_CUTOUT_CODES_SUCCESS':
		return {...state, is_loading_cutout_codes: false };
    case 'LOAD_CUTOUT_CODES_FAILED':
		return {...state, is_loading_cutout_codes: false};
  
    case 'LOAD_EXPECTED_YIELD_CODES':
		return {...state, is_loading_expected_yield: true};
    case 'LOAD_EXPECTED_YIELD_SUCCESS':
		return {...state, is_loading_expected_yield: false };
    case 'LOAD_EXPECTED_YIELD_FAILED':
		return {...state, is_loading_expected_yield: false};
  
    case 'SET_SAIDAS':
		return {...state, saidas: action.payload};
  
    case 'SET_ENTRADAS':
		return {...state, entradas: action.payload};
  
    default:
		return state;
  }
};
