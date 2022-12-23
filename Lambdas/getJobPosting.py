import json
import boto3

def lambda_handler(event, context):
    # TODO implement
    # print(event['queryStringParameters'])
    print(event['queryStringParameters']['id'])
    dynamo = boto3.resource('dynamodb')
    #userData = dynamo.get_item(TableName="candidate_data", Key={'id': {'N': str(83)}})
    table = dynamo.Table('jobPostings')
    #userData = table.query (KeyConditionExpression=Key('email').eq(event['queryStringParameters']['username']))
    userData = table.scan()
    print(userData)
    res = []
    for i in userData['Items']:
        # print(i)
        if 'recruiter' in i.keys() and i['recruiter'] == event['queryStringParameters']['id']:
            i['recruiter']=str(i['recruiter'])
            res.append(i)
    
    print(res)
    return {
        'statusCode': 200,
        'headers': {
            'Access-Control-Allow-Origin' : '*',
            'Access-Control-Allow-Headers': '*',
            'Access-Control-Allow-Methods': 'GET, OPTIONS'
        },
        'body': json.dumps(res)
    }
    
    # responseString = ""
    # if len(password) != 0 and password == event['queryStringParameters']['password']:
    #     responseString = "Login Successful"
    # else:
    #     responseString = "Incorrect Password"
    # res['id'] = str(res['id'])
    # response = {'responseString': responseString, 'data': res}
    # print(response)
    # return {
    #     'statusCode': 200,
    #     'body': json.dumps(response)
    # }
