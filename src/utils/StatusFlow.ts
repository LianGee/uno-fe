import { Constant, ValueText } from '@/constant/requirement';
// STATUS: [
//   {
//     value: 0,
//     text: '新创建',
//   },
//   {
//     value: 1,
//     text: '已回绝',
//   },
//   {
//     value: 2,
//     text: '开发中',
//   },
//   {
//     value: 3,
//     text: '待测试',
//   },
//   {
//     value: 4,
//     text: '测试中',
//   },
//   {
//     value: 5,
//     text: '待验收',
//   },
//   {
//     value: 6,
//     text: '验收中',
//   },
//   {
//     value: 7,
//     text: '已交付',
//   },
// ],
const statusGraph = [
  [0, 1, 1, 0, 0, 0, 0, 0],
  [1, 0, 0, 0, 0, 0, 0, 0],
  [0, 1, 0, 1, 0, 0, 0, 0],
  [0, 1, 1, 0, 1, 1, 0, 0],
  [0, 0, 1, 1, 0, 1, 0, 1],
  [0, 0, 0, 0, 0, 0, 1, 1],
  [0, 0, 0, 0, 0, 4, 0, 1],
  [0, 0, 0, 0, 0, 0, 0, 0],
];

export function getStatusFlow(currentStatus: number) {
  const res: ValueText[] = [];
  for (let i = 0; i < statusGraph[currentStatus].length; i += 1) {
    if (statusGraph[currentStatus][i] === 1) {
      res.push(Constant.STATUS[i])
    }
  }
  return res;
}
