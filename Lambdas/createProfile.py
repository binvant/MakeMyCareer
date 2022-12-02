import json
import boto3
import base64


def lambda_handler(event, context):
    print(event)
    body = str(event['body'])
    print(body)
    print(type(body)) 
    body = json.loads(body)
    print(body)
    print(type(body))
    dynamo_db = boto3.resource('dynamodb')
    dynamo = boto3.client('dynamodb')
    table = dynamo_db.Table('sequence')
    id = table.scan() # get ID
    print(id)
    id = id['Items'][0]['id']
    id = int(id + 1)
    idx = str(id)
    print(idx)
    dynamo.put_item(TableName='sequence', Item={'seqName':{'S':"candidate"},'id':{'N':idx}})
    dynamo.put_item(TableName='candidate_data', Item={'id':{'N': idx}, 'name': {'S': body["name"]}, 'email': {'S':body["email"]}, 'password': {'S':body["password"]}})
    return {
        'statusCode': 200,
        'headers': {
            'Access-Control-Allow-Origin' : '*',
            'Access-Control-Allow-Headers': '*',
            'Access-Control-Allow-Methods': 'POST, OPTIONS'
        },
        'body': json.dumps('Hello from Lambda!')
    }
