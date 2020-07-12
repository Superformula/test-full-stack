FROM node:12.18.2

# installing aws cli
RUN apt-get update -y
RUN apt-get install groff -y
RUN curl "https://awscli.amazonaws.com/awscli-exe-linux-x86_64.zip" -o "awscliv2.zip"
RUN unzip awscliv2.zip
RUN ./aws/install

# installing jest
RUN npm install -g jest

# installing serverless
RUN npm install -g serverless

RUN apt-get install default-jre -y