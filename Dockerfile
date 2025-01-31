FROM node:lts-buster
USER root
RUN apt-get update && \
    apt-get install -y ffmpeg webp git && \
    apt-get upgrade -y && \
    rm -rf /var/lib/apt/lists/*
USER node
RUN git clone https://github.com/Mek-d1/X-BOT-MD.git /home/node/X-BOT-MD
WORKDIR /home/node/X-BOT-MD
RUN chmod -R 777 /home/node/X-BOT-MD/
RUN yarn install --network-concurrency 1
EXPOSE 7860
ENV NODE_ENV=production
CMD ["npm", "start"]
