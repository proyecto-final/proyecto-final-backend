db.createCollection('logs')
db.createCollection('lines')
db.createCollection('timelineLines')
db.createCollection('timelines')
db.createCollection('vulnerabilities')

//vulnerabilities
db.vulnerabilities.insertMany([
  {
    references: ["https://car.mitre.org/wiki/CAR-2016-04-005"],
    level: "low",
    name: "Admin User Remote Logon",
    isCustom: false
  },
  {
    references: ["https://www.fireeye.com/blog/threat-research/2019/01/bypassing-network-restrictions-through-rdp-tunneling.html"],
    level: "high",
    name: "RDP Login from Localhost",
    isCustom: false,
  }
])

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


db.timelines.insertMany([
  {
    title: 'timelineTest1',
    description: 'a test timeline',
    projectId: 1,
    log: db.logs.find({})[0]._id,
    lines: [
      db.timelineLines.find({})[0]._id,
      db.timelineLines.find({})[2]._id
    ],
    updatedAt: new Date(),
    createdAt: new Date()
}])
