import json
import boto3
import base64


def lambda_handler(event, context):
    # TODO implement
    ses_client = boto3.client("ses", region_name="us-east-1")
    body = str(event['body'])
    print(body)
    print(type(body)) 
    body = json.loads(body)
    print(body)
    print(body["email_body"])
    CHARSET = "UTF-8"
    sendMessage = body["email_body"]
    ses_client.send_email(
        Destination={
            "ToAddresses": [
                'sj3251@nyu.edu',
            ],
        },
        Message={
            "Body": {
                "Text": {
                    "Charset": CHARSET,
                    "Data": sendMessage,
                }
            },
            "Subject": {
                "Charset": CHARSET,
                "Data": "Job Referral",
            },
        },
        Source="sj3251@nyu.edu",
    )
    return {
    'statusCode': 200,
    'headers': {
        'Access-Control-Allow-Origin' : '*',
        'Access-Control-Allow-Headers': '*',
        'Access-Control-Allow-Methods': 'POST, OPTIONS'        
        
    },
    'body': json.dumps("Works")
    }
