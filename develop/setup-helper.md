### Generate the security key using openssl only on server 1
openssl rand -base64 756 > ./pki/keyfile
chmod 0400 ./pki/keyfile
sudo chown -R mongodb pki

# Restart the mongod process

sudo systemctl restart mongod


### Add permission for folders
sudo chmod 755 mongo1/data/
sudo chmod 755 mongo2/data/
sudo chmod 755 mongo3/data/

sudo chown 1001:root mongo1/data/
sudo chown 1001:root mongo2/data/
sudo chown 1001:root mongo3/data/

sudo chown 1001:root pki/*
sudo chmod 0400 pki/*

sudo chown root:root logs
sudo chmod 777 logs

sudo touch mongo1/logs/mongo.log && sudo touch mongo2/logs/mongo.log && sudo touch mongo3/logs/mongo.log
sudo chmod 600 mongo1/logs/mongo.log && sudo chmod 600 mongo2/logs/mongo.log && sudo chmod 600 mongo3/logs/mongo.log
sudo chown 1001:root mongo1/logs/mongo.log && sudo chown 1001:root mongo2/logs/mongo.log && sudo chown 1001:root mongo3/logs/mongo.log

### config primary
config = rs.conf()
config.members[2].priority = 10
member = {"_id": 3, "host": "mongod3.replset.com:27017"}

config.members.push(member)
rs.add("mongod3.replset.com:27017")
rs.reconfig(config)


### Logging
show logs
show log startupWarnings
show log global
db.adminCommand( { getLog:'global'} )
tail -fn500 /opt/bitnami/mongodb/logs/mongo.log

use local
    rs.printSecondaryReplicationInfo()
    rs.printReplicationInfo()
### Create user
db.createUser({
   user: "dba-admin",
   pwd: "dba-pass",
   roles: [
     {role: "root", db: "admin"}
   ]
 })


### Write Concern
db.cats.insertOne(
    {"name": "Fluffy",
    "breed": "Siamese",
    "age": 3},
    {writeConcern: {w: "majority", wtimeout: 3000}}
);

db.adminCommand({
    setDefaultRWConcern: 1,
    defaultReadConcern: {level: "majority"},
    defaultWriteConcern: {w: "majority"}
})

### Customization slow query
db.setProfilingLevel(1, {slowms: 30})