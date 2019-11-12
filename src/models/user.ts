import { Effect } from 'dva';
import { Reducer } from 'redux';

import { queryCurrent, queryUsers } from '@/services/user';

export interface CurrentUser {
  avatar?: string;
  name?: string;
  title?: string;
  group?: string;
  signature?: string;
  tags?: {
    key: string;
    label: string;
  }[];
  id?: string;
  unreadCount?: number;
  chineseName?: string;
}

export interface UserModelState {
  currentUser?: CurrentUser;
}

export interface UserModelType {
  namespace: 'user';
  state: UserModelState;
  effects: {
    fetch: Effect;
    fetchCurrent: Effect;
  };
  reducers: {
    saveCurrentUser: Reducer<UserModelState>;
    changeNotifyCount: Reducer<UserModelState>;
  };
}

const UserModel: UserModelType = {
  namespace: 'user',

  state: {
    currentUser: {},
  },

  effects: {
    * fetch(_, { call, put }) {
      const response = yield call(queryUsers);
      yield put({
        type: 'save',
        payload: response.data,
      });
    },
    * fetchCurrent(_, { call, put }) {
      let user = sessionStorage.getItem('user');
      if (user === undefined) {
        user = yield call(queryCurrent).data;
      } else if (typeof user === 'string') {
        user = JSON.parse(user);
      }
      yield put({
        type: 'saveCurrentUser',
        payload: user,
      });
    },
  },

  reducers: {
    saveCurrentUser(state, action) {
      console.log(action.payload);
      return {
        ...state,
        currentUser: action.payload || {},
      };
    },
    changeNotifyCount(
      state = {
        currentUser: {},
      },
      action,
    ) {
      return {
        ...state,
        currentUser: {
          ...state.currentUser,
          notifyCount: action.payload.totalCount,
          unreadCount: action.payload.unreadCount,
        },
      };
    },
  },
};

export default UserModel;
