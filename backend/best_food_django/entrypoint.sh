#!/bin/sh

# Veritabanı ortam değişkenlerinin ayarlandığını kontrol eder
if [ "$DATABASE" = "mysql" ]; then
    echo "Check if database is running..."

    # Veritabanı bağlantısını kontrol eder
    while ! nc -z $MYSQL_HOST $MYSQL_PORT; do
        sleep 0.1
    done

    echo "The database is up and running :-D"
fi

python manage.py makemigrations
# Django migrate komutunu çalıştırır
python manage.py migrate

# Diğer komutları çalıştırır
exec "$@"
