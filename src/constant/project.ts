import { ValueText } from '@/constant/requirement';

export const priority = {
  0: '一般',
  1: '重要',
  2: '核心',
};

export const type = {
  0: '后端',
  1: '前端',
  2: '前后端一体',
};

interface ProjectConstant {
  LEVEL: ValueText[];
  LANGUAGE: ValueText[];
  TYPE: ValueText[];
}

export const ProjectConstant: ProjectConstant = {
  LANGUAGE: [
    {
      value: 0,
      text: 'C/C++',
    },
    {
      value: 1,
      text: 'JAVA',
    },
    {
      value: 2,
      text: 'Python',
    },
    {
      value: 3,
      text: 'GO',
    },
    {
      value: 4,
      text: 'JS',
    },
    {
      value: 5,
      text: 'TypeScript',
    },
  ],
  LEVEL: [
    {
      value: 0,
      text: '一般',
    },
    {
      value: 1,
      text: '重要',
    },
    {
      value: 2,
      text: '核心',
    },
  ],
  TYPE: [
    {
      value: 0,
      text: '前端',
    },
    {
      value: 1,
      text: '后端',
    },
    {
      value: 2,
      text: '前后端一体',
    },
  ],
};
