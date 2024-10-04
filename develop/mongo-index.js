db.people.find({
    dob: {$gte: new Date("1988"), $lte: new Date("1990")}, inactive: false
}).sort({current_score: -1})

db.people.find({
    dob: {$gte: new Date("1988"), $lte: new Date("1990")}, inactive: false
}).explain('executionStats')

db.people.createIndex({dob: 1})

db.people.find({
    dob: {$gte: new Date("1988"), $lte: new Date("1990")}, inactive: false
}).hint({dob: 1, inactive: 1}).explain('executionStats').executionStats

db.people.find({
    dob: {$gte: new Date("1988"), $lte: new Date("1990")}, inactive: false
}).explain('executionStats').executionStats

db.people.find({
    dob: {$gte: new Date("1988"), $lte: new Date("1990")}, inactive: false
}).sort({score: -1}).explain('executionStats').executionStats

db.people.find({
    dob: {$gte: new Date("1988"), $lte: new Date("1990")}, inactive: false
}).sort({score: -1}).explain('executionStats').executionStats

db.people.createIndex({inactive: 1, dob: 1, score: -1})

// ## wildcards index
db.transactions.createIndex({"paymentDetails.$**": 1}) // all fields of an embedded field
db.transactions.createIndex({"$**": 1}) // all fields
db.transactions.createIndex({"$**": 1}, {
    "wildcardProjection": {
        "_id": 1, "paymentDetails.cardType": 0
    }
})


// Partial Indexes
db.collection.createIndex({x: 1, y: 1}, {partialFilterExpression: {z: {lte: 10}}})

db.transactions.createIndex({currency: 1}, {partialFilterExpression: {amount: {$lte: 500}}})

// Sparse Indexes
// index only documents that contain the indexed field even if the field's value is null
// but not good for sorting of imcomplete results

db.transactions.find({avatar_url: {$exists: true}})
db.transactions.createIndex({avatar_url: 1}, {sparse: true})
db.transactions.createIndex({currency: 1}, {sparse: true})
db.transactions.createIndex({currency: 1})

// Timeseries Indexes
// Pros: efficient for time-based queries, reduced storage, improved query performance
// Cons: increased complexity, increased storage overhead, increased maintenance
db.createCollection("weathers", {
    timeseries: {
        timeField: "timestamp", // required, must be a Date
        metaField: "metadata", // optional, default is null
        granularity: "hours", // optional, default is null
    },
})

// 2023-10-12T09:09:42.043+00:00 -> ISODate("2023-10-12T09:09:42.043Z")
// 2024-07-21T14:07:48.174+00:00 -> ISODate("2024-07-21T14:07:48.174Z")
db.weathers.find({
    timestamp: ISODate("2023-10-12T09:09:42.043Z")
}).explain().stages[0].$cursor.queryPlanner.winningPlan

db.weathers.find({
    timestamp: ISODate("2024-07-21T14:07:48.174Z")
}).explain('executionStats').executionStats()

// How to Monitor Indexes
// $indexStats
db.transactions.aggregate([{ $indexStats: {} }])
db.setProfilingLevel(1, { slowms: 30 })
db.system.profile.find({ op: 'query', ns: 'test.art_pieces'}).sort( {ts: -1}).limit(1)