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

db.auth("dba-admin", passwordPrompt())
show users
db.adminCommand({usersInfo: "dba-admin"})


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

mongodump --uri "mongodb://localhost:27017/?replicaSet=replicaset&directConnection=true" --db=test --out=./mongo-test --gzip --archive 

mongodump --uri="mongodb://localhost:27017/?replicaSet=replicaset&directConnection=true" --db=test --gzip --archive=./mongo-test-dump.gz


### Mongodb logs management
db.serverCmdLineOpts().parsed.systemLog.path
show logs
show log global

### Mongodb backup
1. Create a Snapshot
db.fsyncLock()
sudo lvcreate -L 10G --snapshot --name mdb-snapshot /dev/vg0/mdb
sudo lvs
sudo mount /dev/vg0/mdb-snapshot /mnt/mdb-snapshot
db.fsyncUnlock()
sudo dd status=progress if=/dev/vg0/mdb-snapshot | gzip > mdb-snapshot.gz

2. Restore the Archived Snapshot
sudo lvcreate --size 1G --name mdb-new vg0;
gzip -d -c mdb-snapshot.gz | sudo dd status=progress of=/dev/vg0/mdb-new
sudo systemctl stop -l mongod; sudo systemctl status -l mongod;
sudo rm -r /var/lib/mongodb/*
sudo umount /var/lib/mongodb
sudo mount /dev/vg0/mdb-new /var/lib/mongodb
sudo systemctl start -l mongod; sudo systemctl status -l mongod;
mongosh
show dbs