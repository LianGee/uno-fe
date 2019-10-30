import { Effect } from 'dva';
import { Reducer } from 'redux';
import { queryAllProject } from '@/services/project';

export interface Project {
  id: number;
  name: string;
  business: number;
  priority: number;
  type: number;
  language: number[];
  owner: string[];
  logo: string;
  description: string;
  frontendHost: string;
  backendHost: string;
}


export interface ProjectModelState {
  projects?: Project[];
  currentProject: Project;
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
        payload: response,
      });
    },
    * current({ payload }, { put }) {
      yield put({
        type: 'setCurrentProject',
        payload,
      });
    },
  },

  reducers: {
    setProjectList(state, action) {
      return {
        ...state,
        projects: Array.isArray(action.payload) ? action.payload : [],
        currentProject: Array.isArray(action.payload) && action.payload ? action.payload[0] : {},
      };
    },
    setCurrentProject(state, action) {
      return {
        ...state,
        currentProject: action.payload,
      };
    },
  },
};

export default ProjectModel;
