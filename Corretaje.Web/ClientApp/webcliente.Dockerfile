FROM node:14

WORKDIR /propins-web

COPY . .
RUN yarn
RUN yarn build
RUN npm install -g serve

# Expose the default port
EXPOSE 5000

# Set Command
RUN ls -la
CMD ["npm", "serve", "build"]