# Use the latest LTS version of Node.js
FROM node:18-alpine as builder
 
# Set the working directory inside the container
WORKDIR /usr/local/app
 
# Copy package.json and package-lock.json
COPY package*.json ./
 
# Install dependencies
RUN npm install
 
# Copy the rest of your application files
COPY . .

RUN npm run build

# Expose the port your app runs on
EXPOSE 3000
 
# Define the command to run your app
CMD ["npm", "start"]

FROM nginx:1.25 as production
COPY --from=builder /usr/local/app/build /usr/share/nginx/html
RUN rm /etc/nginx/conf.d/default.conf
COPY --from=builder /usr/local/app/nginx/default.conf /etc/nginx/conf.d/default.conf
EXPOSE 80
