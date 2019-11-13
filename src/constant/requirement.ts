export interface ValueText {
  value: number;
  text: string;
}

interface RequirementConstant {
  readonly PRIORITY: ValueText[];
  readonly TYPE: ValueText[];
  readonly STATUS: ValueText[];
}

export const Constant: RequirementConstant = {
  PRIORITY: [
    {
      value: 0,
      text: '一般',
    },
    {
      value: 1,
      text: '高',
    },
    {
      value: 2,
      text: '非常高',
    },
  ],
  TYPE: [
    {
      value: 0,
      text: '优化',
    },
    {
      value: 1,
      text: '新特性',
    },
    {
      value: 2,
      text: '缺陷',
    },
  ],
  STATUS: [
    {
      value: 0,
      text: '新创建',
    },
    {
      value: 1,
      text: '回绝',
    },
    {
      value: 2,
      text: '开发中',
    },
    {
      value: 3,
      text: '待测试',
    },
    {
      value: 4,
      text: '测试中',
    },
    {
      value: 5,
      text: '待验收',
    },
    {
      value: 6,
      text: '验收中',
    },
    {
      value: 7,
      text: '验收通过',
    },
    {
      value: 8,
      text: '已交付',
    },
  ],
};

export const priority = {
  0: '非常高',
  1: '高',
  2: '一般',
};

export const type = {
  0: '新特性',
  1: '缺陷',
  2: '优化',
};
