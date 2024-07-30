import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import enqueriesService from "./enquiresService";
import { toast } from "react-toastify";

const initialState = {
  enquiry: [],
  isError: false,
  isLoading: false,
  isSuccess: false,
  message: "",
};

export const getEnquiries = createAsyncThunk(
  "enquiry/get-enquiries",
  async (thunkAPI) => {
    try {
      return await enqueriesService.getEnqueries();
    } catch (error) {
      thunkAPI.rejectWithValue(error);
    }
  }
);

export const deleteEnquery = createAsyncThunk(
  "enquiries/delete-enquiry",
  async (id, thunkAPI) => {
    try {
      return await enqueriesService.deleteEnquery(id);
    } catch (error) {
      thunkAPI.rejectWithValue(error);
    }
  }
);

export const enquiriesSlice = createSlice({
  name: "enquiries",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getEnquiries.pending, (state) => {
        state.isLoading = true;
        state.isError = false;
        state.isSuccess = false;
      })
      .addCase(getEnquiries.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isError = false;
        state.isSuccess = true;
        state.enquiry = action.payload;
      })
      .addCase(getEnquiries.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.isSuccess = false;
        state.message = action.error;
      })
      .addCase(deleteEnquery.pending, (state) => {
        state.isLoading = true;
        state.isError = false;
        state.isSuccess = false;
      })
      .addCase(deleteEnquery.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isError = false;
        state.isSuccess = true;
        state.deletedBrand = action.payload;
        if (state.isSuccess === true) {
          toast.success("Enquiry Deleted Successfully !");
        }
      })
      .addCase(deleteEnquery.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.isSuccess = false;
        state.message = action.error;
        if (state.isError === true) {
          toast.error("Something Went Wrong ! ");
        }
      });
  },
});

export default enquiriesSlice.reducer;
