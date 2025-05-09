
import { configureStore } from '@reduxjs/toolkit';
import authReducer from './slices/authSlice';
import caseReducer from './slices/caseSlice';
import dashboardReducer from './slices/dashboardSlice';
import lawFirmReducer from './slices/law-firm';
import planReducer from './slices/planSlice';
import invoiceReducer from './slices/invoice';

export const store = configureStore({
  reducer: {
    auth: authReducer,
    case: caseReducer,
    dashboard: dashboardReducer,
    lawFirm: lawFirmReducer,
    plan: planReducer,
    invoice: invoiceReducer
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false,
    }),
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
