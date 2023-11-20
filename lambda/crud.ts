import { DynamoDBClient } from "@aws-sdk/client-dynamodb";
import { PutCommand, DynamoDBDocumentClient, ScanCommand } from "@aws-sdk/lib-dynamodb";
import { APIGatewayProxyEvent, Context } from "aws-lambda";


// Create a dynamodb client
const client = new DynamoDBClient({});
const docClient = DynamoDBDocumentClient.from(client);


// TODO Specify return type
exports.handler = function(event: APIGatewayProxyEvent, context: Context) {
    console.log("request:", JSON.stringify(event, undefined, 2));

    switch (event.httpMethod) {
      case 'GET':
        return handleGet(event);
        break;

      case 'POST':
        return handlePost(event);
        break;
    
      case 'DELETE':
        
        break;
      default:
        return {
          statusCode: 400,
          headers: { "Content-Type": "text/plain" },
          body: `Invalid method: Hello, CDK! You've hit lambda with ${event.httpMethod} method\n`
        };
    }
};

const handleGet = async (event:APIGatewayProxyEvent) => {
  const result = await docClient.send(new ScanCommand({
    TableName: process.env.TABLE_NAME
  }));
  console.log(result.Items);
  return {
    statusCode: 200,
    body: JSON.stringify(result.Items)
  };

}

const handlePost = async(event:APIGatewayProxyEvent) => {
  const result = await docClient.send(new PutCommand({
    TableName: process.env.TABLE_NAME,
    Item: {
      'id':'1',
      'name': 'Parth'
    }
  }));
  return {
    statusCode: 200,
    body: "Insertion Successful"
  }
}