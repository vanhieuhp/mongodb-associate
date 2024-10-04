FROM ubuntu:24.04 as base

# Install dependencies
RUN apt-get update && apt-get install wget -y

RUN wget https://downloads.mongodb.com/compass/mongodb-mongosh_2.3.1_amd64.deb 

RUN wget https://fastdl.mongodb.org/linux/mongodb-linux-x86_64-ubuntu2404-8.0.0.tgz &&  tar -xzvf mongodb-linux-x86_64-ubuntu2404-8.0.0.tgz

# Build the final image
FROM ubuntu:24.04 as mongo

RUN apt-get update && apt-get install libcurl4 libgssapi-krb5-2 libldap2 libwrap0 libsasl2-2 libsasl2-modules libsasl2-modules-gssapi-mit openssl liblzma5 -y

COPY --from=base /mongodb-linux-x86_64-ubuntu2404-8.0.0/bin/* /usr/local/bin/
COPY --from=base mongodb-mongosh_2.3.1_amd64.deb mongodb-mongosh_2.3.1_amd64.deb

RUN  mkdir -p /var/lib/mongo && mkdir -p /var/log/mongodb \
     chown `whoami` /var/lib/mongo && chown `whoami` /var/log/mongodb

RUN dpkg -i mongodb-mongosh_2.3.1_amd64.deb 

RUN rm mongodb-mongosh_2.3.1_amd64.deb

RUN ["mongod", "--dbpath", "/var/lib/mongo", "--logpath", "/var/log/mongodb/mongod.log", "--fork"]

EXPOSE 27017

CMD ["tail", "-f", "/dev/null"]


## INSTALL MONGO NATIVE
FROM mongo as mongo-native

RUN apt-get update && apt-get install gnupg curl -y

RUN curl -fsSL https://www.mongodb.org/static/pgp/server-8.0.asc | gpg -o /usr/share/keyrings/mongodb-server-8.0.gpg --dearmor && echo "deb [signed-by=/usr/share/keyrings/mongodb-server-8.0.gpg] https://repo.mongodb.org/apt/ubuntu focal/mongodb-org/8.0 multiverse" | tee /etc/apt/sources.list.d/mongodb-org-8.0.list

COPY ./timestamp_setup.sh ./timestamp_setup.sh

RUN ./timestamp_setup.sh

RUN apt-get update

RUN apt-get install -y mongodb-org

EXPOSE 27017