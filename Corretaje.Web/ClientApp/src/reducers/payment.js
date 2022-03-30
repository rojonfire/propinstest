import { SET_PAYMENT_SUCCESS, CLEAN_TRX } from "../action";

const initialStateValues = {
  authorizationCode: "",
  commercecode: "",
  amount: "",
  buyOrder: "",
  urlPay: "",
  token: "",
};

const initialState = { ...initialStateValues };

const actionsMap = {
  [CLEAN_TRX]: (state, action) => {
    return {
      ...initialState,
    };
  },
  [SET_PAYMENT_SUCCESS]: (state, action) => {
    const {
      data: { authorizationCode, commercecode, amount, buyOrder, token },
    } = action;

    return {
      ...state,
      authorizationCode,
      commercecode,
      amount,
      buyOrder,
      token,
    };
  },
};

export default (state = initialState, action = {}) => {
  const fn = actionsMap[action.type];
  return fn ? fn(state, action) : state;
};
