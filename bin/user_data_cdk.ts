#!/usr/bin/env node
import 'source-map-support/register';
import * as cdk from 'aws-cdk-lib';
import { UserDataCdkStack } from '../lib/user_data_cdk-stack';
import { LambdaStack } from '../lib/LambdaStack';
import { DatabaseStack } from '../lib/DatabaseStack';
import { Effect, PolicyStatement } from 'aws-cdk-lib/aws-iam';


/*
  *******************

  - This CDK app implements the following tutorial using CDK
  https://docs.aws.amazon.com/apigateway/latest/developerguide/http-api-dynamo-db.html
  
  *******************
*/

const app = new cdk.App();
// new UserDataCdkStack(app, 'UserDataCdkStack', {});

// Call the dynamo db stack
const dynamoDbStack = new DatabaseStack(app, 'DatabaseStack');

// Call the lambda stack
const lambdaStack = new LambdaStack(app, 'LambdaStack');

// Allow our lambda function to perform crud ops on dynamodb table
lambdaStack.lambdaFunc.addToRolePolicy(new PolicyStatement({
  effect: Effect.ALLOW,
  actions: [
    "dynamodb:GetItem",
    "dynamodb:PutItem",
    "dynamodb:Scan",
    "dynamodb:UpdateItem"
  ],
  resources: [
    dynamoDbStack.table.tableArn
  ]
}));