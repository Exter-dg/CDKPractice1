import * as cdk from 'aws-cdk-lib';
import { LambdaIntegration, RestApi } from 'aws-cdk-lib/aws-apigateway';
import { Function } from 'aws-cdk-lib/aws-lambda';

import { Construct } from 'constructs';
// import * as sqs from 'aws-cdk-lib/aws-sqs';

interface APIProps extends cdk.StackProps {
    lambdaIntegration: LambdaIntegration
}

export class ApiStack extends cdk.Stack {

    // public readonly api: RestApi

  constructor(scope: Construct, id: string, props: APIProps) {
    super(scope, id, props);

    const api = new RestApi(this, 'MyRestAPI');
    api.root.addMethod("GET", props.lambdaIntegration);
    api.root.addMethod("POST", props.lambdaIntegration);
    api.root.addMethod("DELETE", props.lambdaIntegration);
  }
}
