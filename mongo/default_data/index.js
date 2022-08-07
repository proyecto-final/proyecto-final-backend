db.createCollection('logs')
db.createCollection('lines')
db.createCollection('timelines')

//log
db.logs.insertMany([
  {
    title: 'log1',
    description: 'log1',
    projectId: 1,
    extension: '.log',
    state:'processed',
    updatedAt: new Date(),
    createdAt: new Date()
  },
  {
    title: 'log2',
    description: 'log2',
    projectId: 1,
    extension: '.log',
    state:'processed',
    updatedAt: new Date(),
    createdAt: new Date()
  },
  {
    title: 'log3',
    description: 'log3',
    projectId: 2,
    extension: '.evtx',
    state:'processed',
    updatedAt: new Date(),
    createdAt: new Date()
  },
  {
    title: 'log4',
    description: 'log4',
    projectId: 1,
    extension: '.evtx',
    state:'processed',
    updatedAt: new Date(),
    createdAt: new Date()
  },
])

//lines

db.lines.insertMany([
  {
    log: db.logs.find({})[0]._id,
    index: 1,
    vulnerabilites: [],
    detail: {
      detaile1: 'detail1',
      detaile2: 'detail2'
    },
    raw: 'Soy un log',
    notes: [
      'nota 1','nota 2'
    ],
    timestamp: '2019-02-13T18:01:47.512340Z'
  },
  {
    log: db.logs.find({})[0]._id,
    index: 2,
    vulnerabilites: [],
    detail: {
      detaile1: 'detail1',
      detaile2: 'detail2'
    },
    raw: 'Soy un log',
    notes: [
      'nota 1','nota 2'
    ],
    timestamp: '2019-02-13T18:01:47.512340Z'
  },
  {
    log: db.logs.find({})[1]._id,
    index: 1,
    vulnerabilites: [],
    detail: {
      detaile1: 'detail1',
      detaile2: 'detail2'
    },
    raw: 'Soy un log',
    notes: [
      'nota 1','nota 2'
    ],
    timestamp: '2019-02-13T18:01:47.512340Z'
  },
  {
    log: db.logs.find({})[1]._id,
    index: 2,
    vulnerabilites: [],
    detail: {
      detaile1: 'detail1',
      detaile2: 'detail2'
    },
    raw: 'Soy un log',
    notes: [
      'nota 1','nota 2'
    ],
    timestamp: '2019-02-13T18:01:47.512340Z'
  },
  {
    log: db.logs.find({})[3]._id,
    index: 1,
    vulnerabilites: [],
    detail: {
      detaile1: 'detail1',
      detaile2: 'detail2'
    },
    raw: 'Soy un log',
    notes: [
      'nota 1','nota 2'
    ],
    timestamp: '2019-02-13T18:01:47.512340Z'
  },
  {
    log: db.logs.find({})[2]._id,
    index: 1,
    vulnerabilites: [],
    detail: {
      detaile1: 'detail1',
      detaile2: 'detail2'
    },
    raw: 'Soy un log',
    notes: [
      'nota 1','nota 2'
    ],
    timestamp: '2019-02-13T18:01:47.512340Z'
  },
])

//timelines

db.timelines.insertMany([
  {
    title: 'timelineTest1',
    description: 'a test timeline',
    projectId: 1,
    log: db.logs.find({})[0]._id,
    lines: [
      {
        index: 1,
        detail: {
          detail1: 'detail1',
          detail2: 'detail2',
          detail3: 'detail3',
        },
        raw: 'raw timelineline',
        line:db.lines.find({})[0]._id,
        tags: [
          'tag1','tag2'
        ],
        vulnerabilites: [],
      },
      {
        index: 2,
        detail: {
          detail1: 'detail1',
          detail2: 'detail2',
          detail3: 'detail3',
        },
        raw: 'raw timelineline',
        line:db.lines.find({})[1]._id,
        tags: [
          'tag1','tag2'
        ],
        vulnerabilites: [],
    }
  ],
    updatedAt: new Date(),
    createdAt: new Date()
}])
