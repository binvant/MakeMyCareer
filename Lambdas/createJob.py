import json
import boto3

def lambda_handler(event, context):
    # TODO implement
    body = event['body']
    body = json.loads(body)
    dynamo_db = boto3.resource('dynamodb')
    dynamo = boto3.client('dynamodb')
    table = dynamo_db.Table('sequence')
    id = table.scan() # get ID
    print(id)
    id = id['Items'][0]['id']
    print(id)
    id = int(id + 1)
    idx = str(id)
    print(idx)
    dynamo.put_item(TableName='sequence', Item={'seqName':{'S':"Job"},'id':{'N':idx}})
    dynamo.put_item(TableName='jobPostings', Item={'JobID':{'S': idx}, 'companyName': {'S': body["company"]}, 'positionName': {'S':body["position"]}, 'skills': {'S':body["skills"]}, 'recruiter': {'S':body["recruiter"]}, 'job_description': {'S':body["job_description"]},
        'jobUrl': {'S':body["jobUrl"]}
    })
    return {
        'statusCode': 200,
        'headers': {
            'Access-Control-Allow-Origin' : '*',
            'Access-Control-Allow-Headers': '*',
            'Access-Control-Allow-Methods': 'POST, OPTIONS'
        },
        'body': json.dumps('Data Inserted Successfully!')
    }
