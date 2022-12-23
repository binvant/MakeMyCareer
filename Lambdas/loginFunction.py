import json
import boto3

def lambda_handler(event, context):
    # TODO implement
    print(event['queryStringParameters'])
    print(event['queryStringParameters']['username'])
    print(event['queryStringParameters']['isRecruiter'])
    print(type(event['queryStringParameters']['isRecruiter']))
    dynamo = boto3.resource('dynamodb')
    #userData = dynamo.get_item(TableName="candidate_data", Key={'id': {'N': str(83)}})
    table = dynamo.Table('candidate_data')
    if event['queryStringParameters']['isRecruiter'] == "true":
        table = dynamo.Table('recruiter_data')
    #userData = table.query (KeyConditionExpression=Key('email').eq(event['queryStringParameters']['username']))
    userData = table.scan()
    print(userData)
    password = ""
    res = {}
    for i in userData['Items']:
        if i['email'] == event['queryStringParameters']['username']:
            password = i['password']
            res = i
            break
    responseString = ""
    if len(password) != 0 and password == event['queryStringParameters']['password']:
        responseString = "Login Successful"
    else:
        responseString = "Incorrect Password"
    res['id'] = str(res['id'])
    response = {'responseString': responseString, 'data': res}
    print(response)
    return {
        'statusCode': 200,
        'headers': {
            'Access-Control-Allow-Origin' : '*',
            'Access-Control-Allow-Headers': '*',
            'Access-Control-Allow-Methods': 'GET, OPTIONS'
        },
        'body': json.dumps(response)
    }
