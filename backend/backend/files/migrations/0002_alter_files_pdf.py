# Generated by Django 4.1.7 on 2023-04-11 05:45

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('files', '0001_initial'),
    ]

    operations = [
        migrations.AlterField(
            model_name='files',
            name='pdf',
            field=models.FileField(upload_to='pdfs/'),
        ),
    ]
