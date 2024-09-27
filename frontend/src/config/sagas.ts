// src/sagas.ts
import { call, CallEffect, put, PutEffect, takeLatest } from 'redux-saga/effects';
import { loginUser,registerUser } from '../api/api'; 

// Action types
export const REQUEST = 'REQUEST';
export const SUCCESS = 'SUCCESS';
export const FAILURE = 'FAILURE';

// Add these lines to your existing action types


// Action creators
export function loginRequest(email: string, password: string) {
  return { type: REQUEST, payload: { email, password } };
}

export function loginSuccess(data: any) {
  return { type: SUCCESS, payload: data };
}

export function loginFailure(error: string) {
  return { type: FAILURE, payload: error };
}


// Add these functions to your existing action creators
export function registerRequest(name:string, email: string, password: string) {
  return { type: REQUEST, payload: { name, email, password } };
}

export function registerSuccess(data: any) {
  return { type: SUCCESS, payload: data };
}

export function registerFailure(error: string) {
  return { type: FAILURE, payload: error };
}

// Saga generator
function* loginSaga(action: ReturnType<typeof loginRequest>):Generator<CallEffect<any> | PutEffect<{
    type: string;
    payload: any;
}>, void, unknown> {
  try {
    const data = yield call(loginUser, action.payload.email, action.payload.password);
    yield put(loginSuccess(data));
  } catch (error:any) {
    yield put(loginFailure(error.message));
  }
}

// Add this function to your sagas file
function* registerSaga(action: ReturnType<typeof registerRequest>): Generator<CallEffect<{
  [key: string]: any;
}> | PutEffect<{
  type: string;
  payload: any;
}>, void, unknown> {
  try {
    const data = yield call(registerUser,action.payload.name, action.payload.email, action.payload.password);
    yield put(registerSuccess(data));
  } catch (error: any) {
    yield put(registerFailure(error.message));
  }
}


// Watching for login attempts
export function* watchLoginSaga() {
  yield takeLatest(REQUEST, loginSaga);
}


// Add this function to your sagas file
export function* watchRegisterSaga() {
  yield takeLatest(REQUEST, registerSaga);
}
