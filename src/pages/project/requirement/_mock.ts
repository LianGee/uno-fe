import { Request, Response } from 'express';
import { Requirement } from '@/pages/project/requirement/data';

const requirementList: any = [
  {
    id: 1,
    projectId: 1,
    title: '需求管理页面',
    content: '',
    type: 0,
    priority: 0,
    start: '2019-11-01',
    status: 0,
    end: '2019-11-11',
    creator: 'bchen',
    assignTo: ['jhzhang', 'bchen'],
  },
  {
    id: 2,
    projectId: 1,
    title: '新建需求页面',
    content: '',
    type: 0,
    priority: 0,
    start: '2019-11-01',
    status: 1,
    end: '2019-11-11',
    creator: 'bchen',
    assignTo: ['jhzhang', 'bchen'],
  },
  {
    id: 3,
    projectId: 1,
    title: '需求管理页面',
    content: '',
    type: 0,
    priority: 0,
    start: '2019-11-01',
    status: 2,
    end: '2019-11-11',
    creator: 'bchen',
    assignTo: ['jhzhang', 'bchen'],
  },
  {
    id: 4,
    projectId: 1,
    title: '需求管理页面',
    content: '',
    type: 0,
    priority: 0,
    start: '2019-11-01',
    status: 3,
    end: '2019-11-11',
    creator: 'bchen',
    assignTo: ['jhzhang', 'bchen'],
  },
  {
    id: 5,
    projectId: 1,
    title: '需求管理页面',
    content: '',
    type: 1,
    priority: 1,
    start: '2019-11-01',
    status: 4,
    end: '2019-11-11',
    creator: '付小小',
    assignTo: ['付小小', '周星星'],
  },
  {
    id: 8,
    projectId: 1,
    title: '需求管理页面',
    content: '',
    type: 1,
    priority: 1,
    start: '2019-11-01',
    status: 4,
    end: '2019-11-11',
    creator: '付小小',
    assignTo: ['付小小', '周星星'],
  },
  {
    id: 6,
    projectId: 1,
    title: '需求管理页面',
    content: '',
    type: 1,
    priority: 1,
    start: '2019-11-01',
    status: 4,
    end: '2019-11-11',
    creator: '付小小',
    assignTo: ['付小小', '周星星'],
  },
  {
    id: 7,
    projectId: 1,
    title: '需求管理页面',
    content: '',
    type: 1,
    priority: 1,
    start: '2019-11-01',
    status: 4,
    end: '2019-11-11',
    creator: '付小小',
    assignTo: ['付小小', '周星星'],
  },
];

function getFakeList(req: Request, res: Response) {
  const params = req.query;
  const requirements = [];
  for (let i = 0; i < requirementList.length; i += 1) {
    const reqi: any = { ...requirementList[i] };
    reqi.title = `${requirementList[i].title}${params.projectId}`;
    requirements.push(reqi);
  }
  return res.json(requirements);
}

function getRequirementById(req: Request, res: Response) {
  const params = req.query;
  const requirement: Requirement = requirementList
    .filter((item: any) => item.id - params.id === 0)
    .pop();
  requirement.content = '测试服';
  requirement.title += params.id;
  return res.json(requirement);
}

const comments: any = [
  {
    id: 1,
    content: '测试评论',
    author: {
      name: '曲丽丽',
      avatar: 'https://gw.alipayobjects.com/zos/antfincdn/XAosXuNZyF/BiazfanxmamNRoxxVxka.png',
    },
    children: [
      {
        id: 2,
        content: '测试评论',
        author: {
          name: '曲丽丽',
          avatar: 'https://gw.alipayobjects.com/zos/antfincdn/XAosXuNZyF/BiazfanxmamNRoxxVxka.png',
        },
      },
    ],
  },
  {
    id: 3,
    content: '测试评论',
    author: {
      name: '曲丽丽',
      avatar: 'https://gw.alipayobjects.com/zos/antfincdn/XAosXuNZyF/BiazfanxmamNRoxxVxka.png',
    },
    children: [
      {
        id: 4,
        content: '测试评论',
        author: {
          name: '曲丽丽',
          avatar: 'https://gw.alipayobjects.com/zos/antfincdn/XAosXuNZyF/BiazfanxmamNRoxxVxka.png',
        },
      },
    ],
  },
];

function getRequirementComments(req: Request, res: Response) {
  const params = req.query;
  const ans = [];
  for (let i = 0; i < comments.length; i += 1) {
    const comment = { ...comments[i] };
    comment.content += comment.content + params.id;
    ans.push(comment);
  }
  return res.json(ans);
}

export default {
  'GET  /requirement/list': getFakeList,
  'GET /requirement/detail': getRequirementById,
  'GET /requirement/comments': getRequirementComments,
};
