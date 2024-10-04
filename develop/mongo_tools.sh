mongoexport -v \
--collection transactions \
--db test \
--query '{ "currency": "CUP", "amount": { "$lte": 400 } }' \
--out transactions.json \
--jsonFormat canonical \
--uri "mongodb://localhost:27017/?replicaSet=replicaset&directConnection=true"

mongostat --uri "mongodb://localhost:27017/?replicaSet=replicaset&directConnection=true"
mongostat -o='host,opcounters.insert.rate()=Insert Rate, opcounters.query.rate()= Query Rate,opcounters.command.rate()= Command Rate' \
 --rowcount=3 --uri "mongodb://localhost:27017/?replicaSet=replicaset&directConnection=true" 2

mongotop --uri="mongodb://localhost:27017/?replicaSet=replicaset&directConnection=true" --rowcount=3 2

mongodump --db=test --collection=transactions --uri="mongodb://localhost:27017/?replicaSet=replicaset&directConnection=true" --out=transactions_dump
bsondump --pretty transactions_dump/test/transactions.bson > transactions_dump.json
bsondump --type=debug transactions_dump/test/transactions.bson

mongofiles -v \
put mongodb_image.jpg \
--uri="mongodb://localhost:27017/myFiles?replicaSet=replicaset&directConnection=true"


mongofiles -v \
get mongodb_image.jpg \
--uri="mongodb://localhost:27017/myFiles?replicaSet=replicaset&directConnection=true"
