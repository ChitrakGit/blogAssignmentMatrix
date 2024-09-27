// src/sagas.ts
import { call, CallEffect, put, PutEffect, takeLatest } from 'redux-saga/effects';
import { fetchBlog } from '../api/api'; 

// Action types
export const REQUEST = 'REQUEST';
export const SUCCESS = 'SUCCESS';
export const FAILURE = 'FAILURE';

// Add these lines to your existing action types


// Action creators
export function fetchBlogRequest(pageNumber:number) {
  return { type: REQUEST, payload: {pageNumber } };
}

export function success(data: any) {
  return { type: SUCCESS, payload: data };
}

export function failure(error: string) {
  return { type: FAILURE, payload: error };
}



// Saga generator
function* todoSaga(action: ReturnType<typeof fetchBlogRequest>):Generator<CallEffect<any> | PutEffect<{
    type: string;
    payload: any;
}>, void, unknown> {
  try {
    const data = yield call(fetchBlog,action.payload.pageNumber);
    yield put(success(data));
  } catch (error:any) {
    yield put(failure(error.message));
  }
}




// Watching for login attempts
export function* watchBlogSagaSaga() {
  yield takeLatest(REQUEST, todoSaga);
}


