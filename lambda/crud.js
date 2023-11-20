exports.handler = async function(event) {
    console.log("request:", JSON.stringify(event, undefined, 2));

    switch (event.httpMethod) {
      case 'GET':
        return handleGet(event);
        break;

      case 'POST':
        
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

const handleGet = (event) => {
  
}