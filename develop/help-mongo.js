// Usage: mongo --shell help-mongo.js

// Config Replica Set
rs.initiate(
    {
        _id: "replicaset",
        version: 1,
        members: [
            { _id: 0, host: "mongo1" },
            { _id: 1, host: "mongo2" },
            { _id: 2, host: "mongo3" }
        ]
    }
)

config = rs.conf()
config.members[0].priority = 10
rs.reconfig(config)
// openssl
// rand - base64
// 756 > config / mongod - keyfile

// Create User
db.createUser({
    user: "dba-admin",
    pwd: "dba-pass",
    roles: [
        { role: "root", db: "admin" }
    ]
})

db.createRole(
    {
        role: "reader",
        privileges: [
            { resource: { db: "test", collection: "users" }, actions: ["find"] }
        ],
        roles: []
    }
)

db.createUser({
    user: "debezium",
    pwd: "debezium",
    roles: [
        { role: "root", db: "admin" }
    ]
})


// Indexes
db.users.explain('queryPlanner').find({ age: { $gt: 25 }, isActivated: true })
db.users.find({ age: { $gt: 25 }, isActivated: true }).limit(3)
db.users.find({ age: { $gt: 25 }, isActivated: true }).explain().queryPlanner.winningPlan
db.users.find({ age: { $gt: 25 }, isActivated: true }).explain().queryPlanner.rejectedPlan