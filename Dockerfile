# FROM alpine:latest as rclone

# # Get rclone executable
# ADD https://downloads.rclone.org/rclone-current-linux-amd64.zip /
# RUN unzip rclone-current-linux-amd64.zip && mv rclone-*-linux-amd64/rclone /bin/rclone && chmod +x /bin/rclone

FROM restic/restic:0.9.6 as restic

FROM node:10-alpine

# COPY --from=rclone /bin/rclone /bin/rclone
COPY --from=restic /usr/bin/restic /usr/bin/restic

ADD https://downloads.rclone.org/rclone-current-linux-amd64.zip /
RUN unzip rclone-current-linux-amd64.zip && mv rclone-*-linux-amd64/rclone /bin/rclone && chmod +x /bin/rclone

RUN apk add --update --no-cache ca-certificates fuse openssh-client heirloom-mailx fuse

RUN \
    mkdir -p /mnt/restic /var/spool/cron/crontabs /var/log; \
    touch /var/log/cron.log;

ENV RESTIC_REPOSITORY=/mnt/restic
ENV RESTIC_PASSWORD=""
ENV RESTIC_TAG=""
ENV NFS_TARGET=""
ENV BACKUP_CRON="0 */6 * * *"
ENV RESTIC_FORGET_ARGS=""
ENV RESTIC_JOB_ARGS=""
ENV MAILX_ARGS=""

# /data is the dir where you have to put the data to be backed up
VOLUME /data

WORKDIR /usr/src/app

COPY backup.sh /bin/backup
COPY entry.sh .

RUN chmod +x /usr/src/app/entry.sh

COPY server .

RUN npm install

EXPOSE 3000
ENTRYPOINT ["sh","/usr/src/app/entry.sh"]
# CMD ["tail","-fn0","/var/log/cron.log"]
CMD [ "node", "index.js" ]

