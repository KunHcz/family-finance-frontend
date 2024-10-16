import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

const BASE_URL = "http://localhost:8080/api/user";

export interface Member {
  id: number;
  username: string;
  password: string;
  gender: string;
  birthDate: string;
  age: number;
  height: number;
  weight: number;
}

const initialState: { members: Member[] } = {
  members: [],
};

export const fetchMembers = createAsyncThunk(
  "members/fetchMembers",
  async () => {
    const response = await axios.get(`${BASE_URL}`);
    return response.data;
  }
);

export const createMember = createAsyncThunk(
  "members/createMember",
  async (member: Member) => {
    const response = await axios.post(`${BASE_URL}`, member);
    return response.data;
  }
);

export const updateMember = createAsyncThunk(
  "members/updateMember",
  async ({ id, member }: { id: number; member: Member }) => {
    const response = await axios.put(`${BASE_URL}/${id}`, member);
    return response.data;
  }
);

export const deleteMember = createAsyncThunk(
  "members/deleteMember",
  async (id: number) => {
    await axios.delete(`${BASE_URL}/${id}`);
    return id;
  }
);

const membersSlice = createSlice({
  name: "members",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchMembers.fulfilled, (state, action) => {
        state.members = action.payload;
      })
      .addCase(createMember.fulfilled, (state, action) => {
        state.members.push(action.payload);
      })
      .addCase(updateMember.fulfilled, (state, action) => {
        const index = state.members.findIndex(
          (member) => member.id === action.payload.id
        );
        if (index !== -1) {
          state.members[index] = action.payload;
        }
      })
      .addCase(deleteMember.fulfilled, (state, action) => {
        state.members = state.members.filter(
          (member) => member.id !== action.payload
        );
      });
  },
});

export default membersSlice.reducer;
