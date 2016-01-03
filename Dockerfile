FROM mhart/alpine-node:latest

# If you have native dependencies, you'll need extra tools
RUN apk add --update make gcc g++ python pixman cairo-gobject pango libjpeg giflib

ADD . .

# If you need npm, don't use a base tag
RUN npm install

RUN npm run build

# If you had native dependencies you can now remove build tools
RUN apk del make gcc g++ python && \
   rm -rf /tmp/* /var/cache/apk/* /root/.npm /root/.node-gyp

EXPOSE 5000
CMD ["node", "dist/server/server.js"]
