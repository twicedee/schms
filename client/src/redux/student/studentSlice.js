import { createSlice } from '@reduxjs/toolkit';

const initialState = {
    student: null,
    error: null,
    loading: false,
};

const studentSlice = createSlice({
    name: 'Student',
    initialState,
    reducers: {
        admittingStudent: (state) => {
            state.loading = true;
            state.error = null;
        },
        studentAdmitted: (state, action) => {
            state.student = action.payload;
            state.loading = false;
            state.error = null;
        },
        failedToAdmit: (state, action) => {
            state.loading = false;
            state.error = action.payload;
        },
        updatingStudent: (state) => {
            state.loading = true;
            state.error = null;
        },
        studentUpdated: (state, action) => {
            state.student = action.payload;
            state.loading = false;
            state.error = null;
        },
        failedToUpdate: (state, action) => {
            state.loading = false;
            state.error = action.payload;
        },
        deletingStudent: (state) => {
            state.loading = true;
            state.error = null;
        },
        studentDeleted: (state) => {
            state.student = null;
            state.loading = false;
            state.error = null;
        },
        failedToDelete: (state, action) => {
            state.loading = false;
            state.error = action.payload;
        },
        
    },
});

export const {
    admittingStudent,
studentAdmitted,
failedToAdmit,
updatingStudent,
studentUpdated,
failedToUpdate,
deletingStudent,
studentDeleted,
failedToDelete
} = studentSlice.actions;

export default studentSlice.reducer;
