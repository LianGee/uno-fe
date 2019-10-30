import { AnyAction, Reducer } from 'redux';
import { EffectsCommandMap } from 'dva';
import { queryFakeList } from './service';

export type Effect = (
  action: AnyAction,
  effects: EffectsCommandMap & { select: <T>(func: (state: {}) => T) => T },
) => void;

export interface ModelType {
  namespace: string;
  state: {
    visible: boolean;
  };
  effects: {
    fetch: Effect;
  };
  reducers: {
    queryList: Reducer<{}>;
  };
}

const SchedulingModel: ModelType = {
  namespace: 'scheduling',
  state: {
    visible: false,
  },
  effects: {
    * fetch({ payload }, { call, put }) {
      const response = yield call(queryFakeList, payload);
      yield put({
        type: 'queryList',
        payload: response,
      });
    },
  },
  reducers: {
    queryList(state, action) {
      return {
        ...state,
        ...action.payload,
      };
    },
  },
};

export default SchedulingModel;
