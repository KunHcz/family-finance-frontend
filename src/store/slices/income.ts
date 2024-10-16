import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

const BASE_URL = "http://localhost:8080/api/income-expense";

export interface Income {
  id: number;
  tag: "income";
  category: string;
  subCategory: string;
  description: string;
  amount: string;
  date: string;
}

const initialState: { incomes: Income[] } = {
  incomes: [],
};

export const fetchIncomes = createAsyncThunk(
  "incomes/fetchIncomes",
  async () => {
    const response = await axios.get(`${BASE_URL}/tag/income`);
    return response.data;
  }
);

export const createIncome = createAsyncThunk(
  "incomes/createIncome",
  async (income: Income) => {
    const response = await axios.post(`${BASE_URL}`, income);
    return response.data;
  }
);

export const updateIncome = createAsyncThunk(
  "incomes/updateIncome",
  async ({ id, income }: { id: number; income: Income }) => {
    const response = await axios.put(`${BASE_URL}/${id}`, income);
    return response.data;
  }
);

export const deleteIncome = createAsyncThunk(
  "incomes/deleteIncome",
  async (id: number) => {
    await axios.delete(`${BASE_URL}/${id}`);
    return id;
  }
);

const incomesSlice = createSlice({
  name: "incomes",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchIncomes.fulfilled, (state, action) => {
        state.incomes = action.payload;
      })
      .addCase(createIncome.fulfilled, (state, action) => {
        state.incomes.push(action.payload);
      })
      .addCase(updateIncome.fulfilled, (state, action) => {
        state.incomes = state.incomes.map((income) =>
          income.id === action.payload.id ? action.payload : income
        );
      })
      .addCase(deleteIncome.fulfilled, (state, action) => {
        state.incomes = state.incomes.filter(
          (income) => income.id !== action.payload
        );
      });
  },
});

export default incomesSlice.reducer;
