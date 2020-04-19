import os
import uuid
import boto3
import config
import psycopg2
from pathlib import Path
from botocore.exceptions import NoCredentialsError
            
def upload_to_aws(path, bucket, s3_file):
    local_file = open(path, 'rb')
    s3 = boto3.client('s3', aws_access_key_id=config.ACCESS_KEY, aws_secret_access_key=config.SECRET_KEY)
    try:
        s3.upload_fileobj(local_file, bucket, s3_file, ExtraArgs={ "ContentType": "image/jpg", 'ACL':'public-read'})
        print("Upload successful")
    except FileNotFoundError:
        print("The file was not found")
        return False
    except NoCredentialsError:
        print("Credentials not available")
        return False

    return 'https://labeler-images.s3.ca-central-1.amazonaws.com/{}'.format(s3_file)


def upload_to_postgres(image_url, local_file_name): 

    try:
        conn = psycopg2.connect("host={} dbname={} user={} password={}".format(config.HOST, config.DB_NAME, config.USER, config.PASSWORD))
    except:
        print("Could not connect to the database")
        return -1

    try:
        cur = conn.cursor()
        cur.execute("INSERT INTO labeler_image(image_url, local_file_name, possible_labels, picked_label) VALUES (%s, %s, %s, %s)", (image_url, local_file_name, ["cat", "dog"], ''))
        conn.commit()
        print("{} - Image successfully inserted into database".format(local_file_name))
        return 1
    except:
        print("{} - Image could not be inserted into database".format(local_file_name))
        return 0


filePaths = list(Path("./images").rglob("*.jpg"))
for index, path in enumerate(filePaths):
    
    s3_file_name = '{}.jpg'.format(uuid.uuid4())

    s3_url = upload_to_aws(path, config.BUCKET_NAME, s3_file_name)

    res = upload_to_postgres(s3_url, s3_file_name)

    if res < 0:
        exit()