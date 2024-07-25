FROM python:3.9.19-slim-bullseye

# best_food_django adinda bir calisma dizini olusturur.
WORKDIR /usr/src/best_food_django

# bytecode larin yazilmamasi icin ,yani dockerin daha temiz bir ortam olmasi icin.
ENV PYTHONDONTWRITEBYTECODE 1
ENV PYTHONUNBUFFERED 1

RUN apt-get update && apt-get install -y \
    netcat \
    pkg-config \
    default-libmysqlclient-dev \
    build-essential


RUN pip install --upgrade pip
COPY ./requirements.txt .
RUN pip install -r requirements.txt

COPY ./entrypoint.sh .
RUN sed -i 's/\r$//g' /usr/src/best_food_django/entrypoint.sh
RUN chmod +x /usr/src/best_food_django/entrypoint.sh

# Yerel makinedeki tum dosyalari konteyner icindeki best_food_django  yukluyor.
COPY . .

ENTRYPOINT [ "/usr/src/best_food_django/entrypoint.sh" ]

# CMD ["python", "manage.py", "runserver", "0.0.0.0:8000"]


