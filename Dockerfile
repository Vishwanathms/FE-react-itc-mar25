# Stage 1: build
FROM node:18 as build

WORKDIR /app
COPY . .

# Accept build args
ARG REACT_APP_API_URL
ENV REACT_APP_API_URL=$REACT_APP_API_URL

RUN npm install
RUN npm run build

# Stage 2: Serve via nginx
FROM nginx:alpine
COPY --from=build /app/build /usr/share/nginx/html
ARG REACT_APP_API_URL
ENV REACT_APP_API_URL=$REACT_APP_API_URL
EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]