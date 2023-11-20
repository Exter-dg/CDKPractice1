import * as cdk from 'aws-cdk-lib';
import * as lambda from 'aws-cdk-lib/aws-lambda';

import { Construct } from 'constructs';
// import * as sqs from 'aws-cdk-lib/aws-sqs';

export class LambdaStack extends cdk.Stack {
  constructor(scope: Construct, id: string, props?: cdk.StackProps) {
    super(scope, id, props);

    // Define a lambda resource (function)
    const crudLambdaFunc = new lambda.Function(this, 'CrudLambdaFunction', {
        runtime: lambda.Runtime.NODEJS_18_X,
        // Get code from lambda directory
        code: lambda.Code.fromAsset('lambda'),
        // File.function_name
        handler: 'crud.handler',
        functionName: 'http-crud-tutorial-function'
    });


    // Export lambda function
    new cdk.CfnOutput(this, 'crudLambdaFuncId', {
        value: crudLambdaFunc.functionArn,
        exportName: 'crudLambdaFuncName'
    });

  }
}
