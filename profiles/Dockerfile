FROM python:3.8.6
ENV PYTHONUNBUFFERED 1

RUN apt update && apt install -y postgresql-client
RUN mkdir /code
WORKDIR /code
COPY requirements.txt .
RUN pip install -r requirements.txt
ADD . /code
