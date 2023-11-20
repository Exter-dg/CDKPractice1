#!/usr/bin/env node
import 'source-map-support/register';
import * as cdk from 'aws-cdk-lib';
import { UserDataCdkStack } from '../lib/user_data_cdk-stack';


/*
  *******************

  - This CDK app implements the following tutorial using CDK
  https://docs.aws.amazon.com/apigateway/latest/developerguide/http-api-dynamo-db.html
  
  *******************
*/

const app = new cdk.App();
new UserDataCdkStack(app, 'UserDataCdkStack', {});
