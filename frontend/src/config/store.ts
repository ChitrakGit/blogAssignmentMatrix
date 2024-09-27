// src/store.ts
import { configureStore } from '@reduxjs/toolkit';
import createSagaMiddleware from 'redux-saga';
import rootReducer from './rootReducer'; 
import { watchLoginSaga,watchRegisterSaga } from './sagas';
import { watchBlogSagaSaga } from './todoSaga';

const sagaMiddleware = createSagaMiddleware();

export const store = configureStore({
  reducer: rootReducer,
//   middleware: [sagaMiddleware]
middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(sagaMiddleware),
});
sagaMiddleware.run(watchLoginSaga);
sagaMiddleware.run(watchRegisterSaga);
sagaMiddleware.run(watchBlogSagaSaga);
export type IRootState = ReturnType<typeof store.getState>
