import { configureStore } from "@reduxjs/toolkit";
import userReducer from "./slices/user";
import membersReducer from "./slices/members";
import incomesReducer from "./slices/income";
import expensesReducer from "./slices/expense";

const store = configureStore({
  reducer: {
    user: userReducer,
    members: membersReducer,
    incomes: incomesReducer,
    expenses: expensesReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export default store;
