import { APIGatewayEvent, Context, Callback } from "aws-lambda";
import { sponsorController } from "./controllers/sponsor.controller";
import { constructResponse } from "./utils/constructResponse";

export const handler = async (event: APIGatewayEvent, context: Context, callback: Callback) => {
  try {
    if (event.path.includes("/sponsors")) {
      return await sponsorController(event);
    }
    return constructResponse(404, { message: "Resource not found" });
  } catch (error: any) {
    console.error("Error in handler:", error);
    return constructResponse(500, { message: "Internal Server Error", error: error.message });
  }
};
