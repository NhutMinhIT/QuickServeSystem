// Import các module cần thiết
import { configureStore, combineReducers } from '@reduxjs/toolkit';
import { TypedUseSelectorHook, useSelector, useDispatch } from 'react-redux';
import { persistReducer, persistStore } from 'redux-persist';
import storage from 'redux-persist/lib/storage';
import accountSlice from '../features/authSlice';
import userSlice from '../features/userSlice';
import categorySlice from '../features/categorySlice';
import ingredientTypeSlice from '../features/ingredientTypeSlice';
import ingredientSlice from '../features/ingredientSlice';
import productTemplateSlice from '../features/productTemplateSlice';
import templateStepSlice from '../features/templateStepSlice';
import storeSlice from '../features/storeSlice';
import employeeSlice from '../features/employeeSlice';
import IngredientTypeTemplateStepSlice from '../features/IngredientTypeTemplateStepSlice';
import sessionSlice from '../features/sessionSlice';
import ingredientSessionSlice from '../features/ingredientSessionSlice';
import nutritionSlice from '../features/nutritionSlice';
import ingredientNutritionSlice from '../features/ingredientNutritionSlice';
import revenueSlice from '../features/revenueSlice';
import paymentSlice from '../features/paymentSlice';
import orderSlice from '../features/orderSlice';


// Định nghĩa cấu hình persist
const persistConfig = {
    key: 'root',
    storage,
    whitelist: [
        'account',
        'users',
        'categories',
        'ingredients',
        'ingredientTypes',
        'productTemplates',
        'templateSteps',
        'stores',
        'employees',
        'ingredientTypeTemplateSteps',
        'sessions',
        'ingredientSession',
        'nutritions',
        'ingredientNutritions',
        'revenues',
        'payment',
        'order'
    ],
};

const rootReducer = combineReducers({
    account: accountSlice,
    users: userSlice,
    categories: categorySlice,
    ingredients: ingredientSlice,
    ingredientTypes: ingredientTypeSlice,
    productTemplates: productTemplateSlice,
    templateSteps: templateStepSlice,
    stores: storeSlice,
    employees: employeeSlice,
    ingredientTypeTemplateSteps: IngredientTypeTemplateStepSlice,
    sessions: sessionSlice,
    ingredientSession: ingredientSessionSlice,
    nutritions: nutritionSlice,
    ingredientNutritions: ingredientNutritionSlice,
    revenues: revenueSlice,
    payment: paymentSlice,
    order: orderSlice
});

const persistedReducer = persistReducer(persistConfig, rootReducer);

export const store = configureStore({
    reducer: persistedReducer,
});

export const persistor = persistStore(store);

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export const useAppDispatch = () => useDispatch<AppDispatch>();
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;
