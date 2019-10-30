import { Request, Response } from 'express';


function getFakeList(req: Request, res: Response) {
  const data = {};
  const dateRange = ['2019-09-01', '2019-10-02', '2019-11-01', '2019-12-01', '2019-08-01'];
  // eslint-disable-next-line no-plusplus
  for (let i = 1; i < 5; i++) {
    let listData;
    // eslint-disable-next-line no-plusplus
    for (let j = 1; j < 31; j++) {
      switch (j) {
        case 8:
          listData = [
            { id: i * j + 1, type: 'warning', content: 'This is warning event.' },
            { id: i * j + 2, type: 'success', content: 'This is usual event.' },
          ];
          break;
        case 10:
          listData = [
            { id: i * j + 1, type: 'warning', content: 'This is warning event.' },
            { id: i * j + 2, type: 'success', content: 'This is usual event.' },
            { id: i * j + 3, type: 'error', content: 'This is error event.' },
          ];
          break;
        case 15:
          listData = [
            { id: i * j + 1, type: 'warning', content: 'This is warning event' },
            { id: i * j + 2, type: 'success', content: 'This is very long usual event。。....' },
            { id: i * j + 3, type: 'error', content: 'This is error event 1.' },
            { id: i * j + 4, type: 'error', content: 'This is error event 2.' },
            { id: i * j + 5, type: 'error', content: 'This is error event 3.' },
            { id: i * j + 6, type: 'error', content: 'This is error event 4.' },
          ];
          break;
        default:
      }
      data[dateRange[i]] = listData;
    }
  }
  return res.json(data);
}

export default {
  'GET  /api/fake_scheduling': getFakeList,
};
