import { Effect } from 'dva';
import { Reducer } from 'redux';
import { queryAllProject, queryProjectById } from '@/services/project';

export interface Project {
  id: number;
  name: string;
  businessId: number;
  business?: any;
  level: number;
  type: number;
  language: string[];
  owner: string[];
  logo: string;
  description: string;
  frontendHost: string;
  backendHost: string;
}

export interface ProjectModelState {
  projects?: Project[];
  currentProject?: Project;
}

export interface ProjectModelType {
  namespace: 'project';
  state: ProjectModelState;
  effects: {
    fetch: Effect;
    current: Effect;
  };
  reducers: {
    setProjectList: Reducer<ProjectModelState>;
    setCurrentProject: Reducer<ProjectModelState>;
  };
}

const ProjectModel: ProjectModelType = {
  namespace: 'project',

  state: {
    projects: [],
    currentProject: {} as Project,
  },
  effects: {
    * fetch(_, { call, put }) {
      const response = yield call(queryAllProject);
      yield put({
        type: 'setProjectList',
        payload: response.data,
      });
    },
    * current({ payload }, { call, put }) {
      const response = yield call(queryProjectById, payload.id);
      yield put({
        type: 'setCurrentProject',
        payload: response.data,
      });
    },
  },

  reducers: {
    setProjectList(state, action) {
      return {
        ...state,
        projects: Array.isArray(action.payload) ? action.payload : [],
      };
    },
    setCurrentProject(state, action) {
      if (action.payload.id === undefined) {
        return {
          ...state,
          currentProject: { id: 0 },
        };
      }
      return {
        ...state,
        currentProject: action.payload,
      };
    },
  },
};

export default ProjectModel;
