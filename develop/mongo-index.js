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