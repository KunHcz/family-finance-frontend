import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

const BASE_URL = "http://localhost:8080/api/income-expense";

export interface Expense {
  id: number;
  tag: "expense";
  category: string;
  subCategory: string;
  description: string;
  amount: string;
  date: string;
}

const initialState: { expenses: Expense[] } = {
  expenses: [],
};

export const fetchExpenses = createAsyncThunk(
  "expenses/fetchExpenses",
  async () => {
    const response = await axios.get(`${BASE_URL}/tag/expense`);
    return response.data;
  }
);

export const createExpense = createAsyncThunk(
  "expenses/createExpense",
  async (expense: Expense) => {
    const response = await axios.post(`${BASE_URL}`, expense);
    return response.data;
  }
);

export const updateExpense = createAsyncThunk(
  "expenses/updateExpense",
  async ({ id, expense }: { id: number; expense: Expense }) => {
    const response = await axios.put(`${BASE_URL}/${id}`, expense);
    return response.data;
  }
);

export const deleteExpense = createAsyncThunk(
  "expenses/deleteExpense",
  async (id: number) => {
    await axios.delete(`${BASE_URL}/${id}`);
    return id;
  }
);

const expensesSlice = createSlice({
  name: "expenses",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchExpenses.fulfilled, (state, action) => {
        state.expenses = action.payload;
      })
      .addCase(createExpense.fulfilled, (state, action) => {
        state.expenses.push(action.payload);
      })
      .addCase(updateExpense.fulfilled, (state, action) => {
        const index = state.expenses.findIndex(
          (expense) => expense.id === action.payload.id
        );
        if (index !== -1) {
          state.expenses[index] = action.payload;
        }
      })
      .addCase(deleteExpense.fulfilled, (state, action) => {
        state.expenses = state.expenses.filter(
          (expense) => expense.id !== action.payload
        );
      });
  },
});

export default expensesSlice.reducer;
