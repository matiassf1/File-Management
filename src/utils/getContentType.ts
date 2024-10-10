import { APIGatewayEvent } from "aws-lambda";

export const getContentType = (event: APIGatewayEvent) => {
    const contentType = event.headers['content-type'] || event.headers['Content-Type'];
    return contentType;
};