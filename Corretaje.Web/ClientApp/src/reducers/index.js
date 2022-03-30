import reducers from "./reducers";
import auth from "./auth";
import pay from "./payment";
import { reducer as form } from "redux-form";

export default {
  app: reducers,
  auth,
  form,
  pay,
};
