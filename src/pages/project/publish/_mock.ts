import { Request, Response } from 'express';
import { Publish } from '@/pages/project/publish/data';

const publishes: Publish[] = [
  {
    id: 1,
    projectId: 2,
    title: '交付页面',
    version: 'v1.0',
    deadline: '2019-11-10',
    status: 1,
    creator: 'ffan',
    checker: 'qiushengzhang',
  },
  {
    id: 2,
    projectId: 2,
    title: '交付关联需求',
    version: 'v1.1',
    deadline: '2019-11-10',
    status: 0,
    creator: 'ffan',
    checker: 'qiushengzhang',
  },
  {
    id: 3,
    projectId: 2,
    title: '文档',
    version: 'v1.2',
    deadline: '2019-11-10',
    status: 2,
    creator: 'ffan',
    checker: 'qiushengzhang',
  },
];

function getPublishList(req: Request, res: Response) {
  const paramms = req.query;
  const result = [];
  for (let i = 0; i < publishes.length; i += 1) {
    const publish = publishes[i];
    const pub = { ...publish };
    pub.version = `${publish.version}${paramms.projectId}`;
    result.push(pub);
  }
  return res.json(result);
}

function getPublishById(req: Request, res: Response) {
  const paramms = req.query;
  for (let i = 0; i < publishes.length; i += 1) {
    const publish = publishes[i];
    if (paramms.publishId - publish.id === 0) {
      return res.json(publish);
    }
  }
  return res.json(undefined);
}

export default {
  'GET  /publish/list': getPublishList,
  'GET  /publish/get': getPublishById,
};
