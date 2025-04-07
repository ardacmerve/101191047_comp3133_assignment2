# Stage 1: Build the Angular app
FROM node:16 as build-stage
WORKDIR /app
COPY package*.json ./
RUN npm install
COPY . .
RUN npm run build

# Stage 2: Serve the app using nginx
FROM nginx:alpine
COPY --from=build-stage /app/dist/101191047_comp3133_assignment2 /usr/share/nginx/html
COPY nginx.conf /etc/nginx/conf.d/default.conf
EXPOSE 80
