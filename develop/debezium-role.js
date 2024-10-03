// Connect to MongoDB as an admin user
// use admin

// Create a role for Debezium
db.createRole({
    role: "debeziumRole",
    privileges: [
        { resource: { db: "config", collection: "system.sessions" }, actions: ["find", "update", "insert", "remove"] },
        { resource: { db: "", collection: "" }, actions: ["find", "listCollections", "listIndexes"] },
        { resource: { db: "", collection: "system.replset" }, actions: ["find"] },
        { resource: { db: "", collection: "oplog.rs" }, actions: ["find", "listCollections", "listIndexes"] }
    ],
    roles: [
        { role: "read", db: "local" }
    ]
})

// Create a user for Debezium and assign the role
db.createUser({
    user: "debezium",
    pwd: "debezium",  // Replace with a secure password
    roles: [
        { role: "debeziumRole", db: "admin" }
    ]
})