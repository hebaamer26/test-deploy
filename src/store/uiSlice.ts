import { createSlice, PayloadAction } from '@reduxjs/toolkit';

export interface UiState {
    isAuthModalOpen: boolean;
    authModalMessage: string;
}

const initialState: UiState = {
    isAuthModalOpen: false,
    authModalMessage: "Please log in to continue.",
};

export const uiSlice = createSlice({
    name: 'ui',
    initialState,
    reducers: {
        openAuthModal: (state, action: PayloadAction<string>) => {
            state.isAuthModalOpen = true;
            state.authModalMessage = action.payload || "Please log in to continue.";
        },
        closeAuthModal: (state) => {
            state.isAuthModalOpen = false;
        },
    },
});

export const { openAuthModal, closeAuthModal } = uiSlice.actions;
export const uiReducer = uiSlice.reducer;
