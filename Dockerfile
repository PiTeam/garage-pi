FROM mhart/alpine-node:latest

# If you have native dependencies, you'll need extra tools
RUN apk add --update make gcc g++ python 

ADD . .

# If you need npm, don't use a base tag
RUN npm install --production

# If you had native dependencies you can now remove build tools
RUN apk del python sqlite-libs readline ncurses-libs ncurses-terminfo-base \
            gdbm libffi expat libbz2 make g++ libc-dev musl-dev libc6-compat \
            musl-dbg gcc mpc1 mpfr3 gmp pkgconfig pkgconf libgomp binutils binutils-libs && \
    rm -rf /tmp/* /var/cache/apk/* /root/.npm /root/.node-gyp

EXPOSE 5000
CMD ["node", "dist/server.js"]
