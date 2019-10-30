import { EffectsCommandMap } from 'dva';
import { AnyAction, Reducer } from 'redux';
import { queryFakeList } from '@/pages/project/manager/service';
import { Project } from '@/models/project';

export interface StateType {
  list: Project[];
}

export type Effect = (
  action: AnyAction,
  effects: EffectsCommandMap & { select: <T>(func: (state: StateType) => T) => T },
) => void;

export interface ModelType {
  namespace: string;
  state: StateType;
  effects: {
    fetch: Effect;
    apply: Effect;
  };
  reducers: {
    queryList: Reducer<StateType>;
    apply: Reducer<StateType>;
  };
}

const Model: ModelType = {
  namespace: 'projects',
  state: {
    list: [],
  },
  effects: {
    *fetch({ payload }, { call, put }) {
      const response = yield call(queryFakeList, payload);
      yield put({
        type: 'queryList',
        payload: Array.isArray(response) ? response : [],
      });
    },
    *apply({ payload }, { call, put }) {
      const response = yield call(queryFakeList, payload);
      yield put({
        type: 'apply',
        payload: Array.isArray(response) ? response : [],
      });
    },
  },
  reducers: {
    queryList(state, action) {
      return {
        ...state,
        list: action.payload,
      };
    },
    apply(state, action) {
      return {
        ...state,
        list: action.payload,
      };
    },
  },
};

export default Model;
