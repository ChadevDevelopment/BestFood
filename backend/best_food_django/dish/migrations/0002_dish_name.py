# Generated by Django 3.2.18 on 2024-08-05 13:16

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('dish', '0001_initial'),
    ]

    operations = [
        migrations.AddField(
            model_name='dish',
            name='name',
            field=models.CharField(default='defaultName', max_length=255),
        ),
    ]