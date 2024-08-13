FROM nginx:alpine

# copy files to nginx
COPY public /usr/share/nginx/html
