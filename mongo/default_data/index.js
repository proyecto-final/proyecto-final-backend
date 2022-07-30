db.createCollection('logs')
db.createCollection('lines')
db.createCollection('timelinesLines')
db.createCollection('timelines')

//log
db.logs.insertMany([
  {
    title: 'log1',
    description: 'log1',
    projectId: 1,
    extension: '.log',
    state:'processed'
  },
  {
    title: 'log2',
    description: 'log2',
    projectId: 1,
    extension: '.log',
    state:'processed'
  },
  {
    title: 'log3',
    description: 'log3',
    projectId: 2,
    extension: '.evtx',
    state:'processed'
  },
  {
    title: 'log4',
    description: 'log4',
    projectId: 1,
    extension: '.evtx',
    state:'processed'
  },
])

//lines

db.lines.insertMany([
  {
    log: db.logs.find({})[0]._id,
    vulnerabilites: [],
    detail: {
      detaile1: 'detail1',
      detaile2: 'detail2'
    },
    raw: 'Soy un log',
    notes: [
      'nota 1','nota 2'
    ]
  },
  {
    log: db.logs.find({})[0]._id,
    vulnerabilites: [],
    detail: {
      detaile1: 'detail1',
      detaile2: 'detail2'
    },
    raw: 'Soy un log',
    notes: [
      'nota 1','nota 2'
    ]
  },
  {
    log: db.logs.find({})[1]._id,
    vulnerabilites: [],
    detail: {
      detaile1: 'detail1',
      detaile2: 'detail2'
    },
    raw: 'Soy un log',
    notes: [
      'nota 1','nota 2'
    ]
  },
  {
    log: db.logs.find({})[1]._id,
    vulnerabilites: [],
    detail: {
      detaile1: 'detail1',
      detaile2: 'detail2'
    },
    raw: 'Soy un log',
    notes: [
      'nota 1','nota 2'
    ]
  },
  {
    log: db.logs.find({})[3]._id,
    vulnerabilites: [],
    detail: {
      detaile1: 'detail1',
      detaile2: 'detail2'
    },
    raw: 'Soy un log',
    notes: [
      'nota 1','nota 2'
    ]
  },
  {
    log: db.logs.find({})[2]._id,
    vulnerabilites: [],
    detail: {
      detaile1: 'detail1',
      detaile2: 'detail2'
    },
    raw: 'Soy un log',
    notes: [
      'nota 1','nota 2'
    ]
  },
])

//timelines

db.timelineLines.insertMany([
  {
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
  },
  {
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
  },
  {
    detail: {
      detail1: 'detail1',
      detail2: 'detail2',
      detail3: 'detail3',
    },
    raw: 'raw timelineline',
    line:db.lines.find({})[2]._id,
    tags: [
      'tag1','tag2'
    ],
    vulnerabilites: [],
  },
  {
    detail: {
      detail1: 'detail1',
      detail2: 'detail2',
      detail3: 'detail3',
    },
    raw: 'raw timelineline',
    line:db.lines.find({})[2]._id,
    tags: [
      'tag1','tag2'
    ],
    vulnerabilites: [],
  },
  {
    detail: {
      detail1: 'detail1',
      detail2: 'detail2',
      detail3: 'detail3',
    },
    raw: 'raw timelineline',
    line:db.lines.find({})[2]._id,
    tags: [
      'tag1','tag2'
    ],
    vulnerabilites: [],
  }
])


/*
db.timelineLines.find({})
db.timeline.insertMany([
  {
    title: 'timelineTest1',
    description: 'a test timeline',
    projectId: 1,
    log: {
      type: Schema.Types.ObjectId,
      ref: 'log'
    },
    lines: [
      db.timelineLines.find({})[0]._id, //TODO tiene que coincidier con lo que haya en logs
      db.timelineLines.find({})[0]._id,
      db.timelineLines.find({})[0]._id,
    ]
}])*/