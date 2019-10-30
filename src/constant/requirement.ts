export interface ValueText {
  value: number;
  text: string;
}
interface RequirementConstant {
  readonly PRIORITY: ValueText[];
  readonly TYPE: ValueText[];
}

export const Constant: RequirementConstant = {
  PRIORITY: [
    {
      value: 0,
      text: '非常高',
    },
    {
      value: 1,
      text: '高',
    },
    {
      value: 2,
      text: '一般',
    },
  ],
  TYPE: [
    {
      value: 0,
      text: '新特性',
    },
    {
      value: 1,
      text: '缺陷',
    },
    {
      value: 2,
      text: '优化',
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
