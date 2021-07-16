import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import moment from 'moment';
import { createSelector } from 'reselect';
import { apiCallBegan, IApi } from './api';
import { AppDispatch, RootState } from './configureStore';

export interface BugsModel {
  id?: number,
  description?: string,
  userId?: number | undefined | null,
  resolved?: boolean
}

export interface BugsState {
  list: BugsModel[],
  loading: boolean,
  lastFetch: any
}

const initialState = {
  list: [],
  loading: false,
  lastFetch: null,
} as BugsState

let lastid: number = 1;
const slice = createSlice({
  name: 'bugs',
  initialState,
  reducers: {
    bugsRequested: (bug: BugsState, action: PayloadAction<BugsState>) => {
      bug.loading = true;
    },
    bugsReceived: (bugs: BugsState, action: PayloadAction<BugsState>) => {
      bugs.list = action.payload.list;
      bugs.loading = false;
      bugs.lastFetch = Date.now();
    },
    bugsRequestFailed: (bugs: BugsState, action: PayloadAction<BugsState>) => {
      bugs.loading = false;
    },
    bugAssignedToUser: (bugs: BugsState, action: PayloadAction<BugsModel>) => {
      const { id: bugId, userId } = action.payload;
      const index = bugs.list.findIndex((bug) => bug.id === bugId);
      bugs.list[index].userId = userId;
    },
    bugAdded: (bugs: BugsState, action: PayloadAction<BugsModel>) => {
      bugs.list.push({id: lastid++,...action.payload});
    },
    bugResolved: (bugs: BugsState, action: PayloadAction<BugsModel>) => {
      const index = bugs.list.findIndex((bug) => bug.id === action.payload.id);
      bugs.list[index].resolved = true;
    },
    bugRemoved: (bugs: any, action: PayloadAction<any>) => {
      return bugs.list.filter((bug: any) => bug.id !== action.payload.id);
    },
  },
});

export const {
  bugsReceived,
  bugAssignedToUser,
  bugAdded,
  bugResolved,
  bugRemoved,
  bugsRequested,
  bugsRequestFailed,
} = slice.actions;
export default slice.reducer;

// Action Creators
const url: string = '/bugs';

export const loadBugs = () => (dispatch: AppDispatch, getState: any) => {
  const state: RootState = getState();
  const { lastFetch } = state.entities.bugs;

  const diffInMinutes = moment().diff(moment(lastFetch), 'minutes');
  if (diffInMinutes < 10) return;

  const bugsRequestedApi: IApi = {
    url: url,
    onStart: bugsRequested.type,
    onSuccess: bugsReceived.type,
    onError: bugsRequestFailed.type,
  }

  dispatch(
    apiCallBegan(bugsRequestedApi)
  );
};

// export const addBug = (bug) =>
//   apiCallBegan({
//     url,
//     method: 'post',
//     data: bug,
//     onSuccess: bugAdded.type,
//   });

// export const resolveBug = (id) =>
//   apiCallBegan({
//     url: `${url}/${id}`,
//     method: 'patch',
//     data: { resolved: true },
//     onSuccess: bugResolved.type,
//   });

// export const assignBugToUser = (bugId, userId) =>
//   apiCallBegan({
//     url: `${url}/${bugId}`,
//     method: 'patch',
//     data: { userId },
//     onSuccess: bugAssignedToUser.type,
//   });

// // Selector
export const getUnresolvedBugs = createSelector(
  (state: RootState) => state.entities.bugs.list,
  (list: BugsModel[]) => list.filter((bug: BugsModel) => !bug.resolved)
);

// export const getBugsbyUser = (userId) =>
//   createSelector(
//     (state) => state.entities.bugs.list,
//     (bugs) => bugs.filter((bug) => bug.userId === userId)
//   );
