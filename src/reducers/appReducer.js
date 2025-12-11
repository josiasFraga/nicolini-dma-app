//import IMAGES from "@constants/images";

const INITIAL_STATE = {
  is_logging_in: false,
  is_next_date_loading: false,
  stores: [],
  is_user_products_loading: false,
  user_products: [],

  // Padaria
  is_loading_bakery_goods: false,
  producoes_padaria: [],
  quebras_padaria: [],
  next_date_padaria: '',
  saidas_padaria: [],
  entradas_padaria: [],

  // Hortifruti
  is_loading_produce_section_goods: false,
  is_producoes_loading: false,
  producoes: [],
  is_quebras_loading: false,
  quebras: [],
  next_date_horti: '',

  // Açougue
  is_loading_goods: false,
  is_loading_cutout_codes: false,
  is_loading_expected_yield: false,
  saidas: [],
  entradas: [],
  next_date: ''
};

export const appReducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
  
    case 'LOGIN':
		return {...state, is_logging_in: true};
    case 'LOGIN_SUCCESS':
		return {...state, is_logging_in: false};
    case 'LOGIN_FAILED':
		return {...state, is_logging_in: false};

    case 'LOAD_STORES':
		return {...state, is_sotres_loading: true, stores: []};
    case 'LOAD_STORES_SUCCESS':
		return {...state, is_sotres_loading: false, stores: action.payload };
    case 'LOAD_STORES_FAILED':
		return {...state, is_sotres_loading: false, stores: []};

    case 'GET_USER_PRODUCTS':
		return {...state, is_user_products_loading: true, user_products: []};
    case 'GET_USER_PRODUCTS_SUCCESS':
		return {...state, is_user_products_loading: false, user_products: action.payload };
    case 'GET_USER_PRODUCTS_FAILED':
		return {...state, is_user_products_loading: false, user_products: []};

    // Hortifruti
    case 'LOAD_PRODUCE_SECTION_GOODS':
		return {...state, is_loading_produce_section_goods: true};
    case 'LOAD_PRODUCE_SECTION_GOODS_SUCCESS':
		return {...state, is_loading_produce_section_goods: false };
    case 'LOAD_PRODUCE_SECTION_GOODS_FAILED':
		return {...state, is_loading_produce_section_goods: false};

    case 'LOAD_PRODUCTIONS':
		return {...state, is_producoes_loading: true, producoes: [], producoes_padaria: []};
    case 'LOAD_PRODUCTIONS_SUCCESS':
		return {...state, is_producoes_loading: false, producoes: action.payload };
    case 'LOAD_PRODUCTIONS_FAILED':
		return {...state, is_producoes_loading: false, producoes: []};

    case 'LOAD_DISCREPANCIES':
		return {...state, is_quebras_loading: true, quebras: [], quebras_padaria: []};
    case 'LOAD_DISCREPANCIES_SUCCESS':
		return {...state, is_quebras_loading: false, quebras: action.payload };
    case 'LOAD_DISCREPANCIES_FAILED':
		return {...state, is_quebras_loading: false, quebras: []};
  
    // Padaria
    case 'LOAD_BAKERY_GOODS':
		return {...state, is_loading_bakery_goods: true};
    case 'LOAD_BAKERY_GOODS_SUCCESS':
		return {...state, is_loading_bakery_goods: false };
    case 'LOAD_BAKERY_GOODS_FAILED':
		return {...state, is_loading_bakery_goods: false};

    case 'LOAD_BAKERY_PRODUCTIONS_SUCCESS':
		return {...state, is_producoes_loading: false, producoes_padaria: action.payload };
    case 'LOAD_BAKERY_PRODUCTIONS_FAILED':
		return {...state, is_producoes_loading: false, producoes_padaria: []};

    case 'LOAD_BAKERY_DISCREPANCIES_SUCCESS':
		return {...state, is_quebras_loading: false, quebras_padaria: action.payload };
    case 'LOAD_BAKERY_DISCREPANCIES_FAILED':
		return {...state, is_quebras_loading: false, quebras_padaria: []};

    case 'LOAD_BAKERY_INCOMES_SUCCESS':
		return {...state, entradas_padaria: action.payload };
    case 'LOAD_BAKERY_INCOMES_FAILED':
		return {...state, entradas_padaria: []};

    case 'LOAD_BAKERY_OUTCOMES_SUCCESS':
		return {...state, saidas_padaria: action.payload };
    case 'LOAD_BAKERY_OUTCOMES_FAILED':
		return {...state, saidas_padaria: []};
  
    // Açougue
    case 'LOAD_CUTOUT_CODES':
		return {...state, is_loading_cutout_codes: true};
    case 'LOAD_CUTOUT_CODES_SUCCESS':
		return {...state, is_loading_cutout_codes: false };
    case 'LOAD_CUTOUT_CODES_FAILED':
		return {...state, is_loading_cutout_codes: false};
  
    case 'LOAD_GOODS':
		return {...state, is_loading_goods: true};
    case 'LOAD_GOODS_SUCCESS':
		return {...state, is_loading_goods: false };
    case 'LOAD_GOODS_FAILED':
		return {...state, is_loading_goods: false};
  
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
  
    case 'LOAD_NEXT_DATE':
		return {...state, is_next_date_loading: true, next_date: '', next_date_horti: ''};
    case 'LOAD_NEXT_DATE_SUCCESS':
		return {...state, is_next_date_loading: false, next_date: action.payload };
    case 'LOAD_NEXT_DATE_HORTI_SUCCESS':
		return {...state, is_next_date_loading: false, next_date_horti: action.payload };
    case 'LOAD_NEXT_DATE_PADARIA_SUCCESS':
		return {...state, is_next_date_loading: false, next_date_padaria: action.payload };
    case 'LOAD_NEXT_DATE_FAILED':
		return {...state, is_next_date_loading: false, next_date: '', next_date_horti: ''};
  
    default:
		return state;
  }
};
