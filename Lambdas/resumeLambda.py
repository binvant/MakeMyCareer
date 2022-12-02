import json
import boto3
import io, base64

def lambda_handler(event, context):
    # TODO implement
    print(event)
    ev = event['body-json']
    ev = bytes(ev, 'utf-8')
    resume = base64.b64decode(ev)
    bucket = 'resume-bucket-bsb'
    file_path = '/resume'
    s3 = boto3.client('s3')
    s3.put_object(Bucket=bucket, Key=file_path, Body=resume)
    textract = boto3.client('textract')
    doc = textract.detect_document_text(Document={
        'S3Object': {
            'Bucket': bucket,
            'Name': '/newwwww_candidate_resume',
        }
    })
    print(doc)
    return {
        'statusCode': 200,
        'headers': {
            'Access-Control-Allow-Origin' : '*',
            'Access-Control-Allow-Headers': '*',
            'Access-Control-Allow-Methods': 'POST, OPTIONS'
        },
        'body': json.dumps(doc)
    }

