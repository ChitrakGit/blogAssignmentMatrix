// src/selectors/authSelectors.ts

import { IRootState } from "../config/store";



export const selectAuthLoadingStatus = (state: IRootState) => state.auth.status;
export const selectBlogStatus = (state: IRootState) => state.todo.status;
