import { createAction } from '@reduxjs/toolkit';

export interface IApi {
    url: string,
    onStart: string,
    onSuccess: string,
    onError: string,
  }  

export const apiCallBegan = createAction<IApi>('api/callBegan');
export const apiCallSuccess = createAction<any>('api/callSuccess');
export const apiCallFailed = createAction<any>('api/callFailed');
