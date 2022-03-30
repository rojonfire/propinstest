import {
  SET_LOGIN,
  SET_ACCESSTOKEN,
  LOGOUT,
  SET_USERID,
  SET_RUT,
  SET_ORDENES_COMPRA,
  SET_VERIFICA_CEDULA,
  SET_CLIENTE_ID
} from "../action";

const initialStateValues = {
  isLoggedIn: false,
  accessToken: null,
  userId: null,
  rut: null,
  ordenescompra: [],
  isVerifiedCedula: false,
  idCliente: "",
  tipoCuenta: null
};

const initialState = { ...initialStateValues };

const actionsMap = {
  [LOGOUT]: (state, action) => {
    return {
      ...initialState
    };
  },
  [SET_LOGIN]: (state, action) => {
    const {
      data: { isLoggedIn, accessToken, properId, tipoCuenta }
    } = action;

    return {
      ...state,
      isLoggedIn,
      accessToken,
      properId,
      tipoCuenta
    };
  },
  [SET_ACCESSTOKEN]: (state, action) => {
    const { accessToken } = action;
    return {
      ...state,
      accessToken
    };
  },
  [SET_USERID]: (state, action) => {
    const { userId } = action;
    return {
      ...state,
      userId
    };
  },
  [SET_RUT]: (state, action) => {
    const { rut } = action;
    return {
      ...state,
      rut
    };
  },
  [SET_ORDENES_COMPRA]: (state, action) => {
    const { ordenescompra } = action;
    return {
      ...state,
      ordenescompra
    };
  },
  [SET_VERIFICA_CEDULA]: (state, action) => {
    const { isVerifiedCedula } = action;
    return {
      ...state,
      isVerifiedCedula
    };
  },
  [SET_CLIENTE_ID]: (state, action) => {
    const { idCliente } = action;
    return {
      ...state,
      idCliente
    };
  },
};

export default (state = initialState, action = {}) => {
  const fn = actionsMap[action.type];
  return fn ? fn(state, action) : state;
};
