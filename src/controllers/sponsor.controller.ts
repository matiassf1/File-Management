// src/controllers/sponsor.controller.ts
import { APIGatewayEvent } from "aws-lambda";
import { getSponsorById, getAllSponsors, createSponsor, updateSponsor, deleteSponsor } from "../services/sponsor.service";
import { constructResponse } from "../utils/constructResponse";
import { parseFormData } from "../utils";
import { S3StorageService } from "../storage/s3.storage.service";
import { FileUploadService } from "../services/file-upload.service";

export const sponsorController = async (event: APIGatewayEvent) => {
    const { httpMethod, queryStringParameters } = event;

    const storageService = new S3StorageService();
    const fileUploadService = new FileUploadService(storageService);
    
    try {
        switch (httpMethod) {
            case "GET":
                if (queryStringParameters?.id) {
                    const sponsor = await getSponsorById(queryStringParameters.id);
                    if (!sponsor) {
                        return constructResponse(404, { message: `Sponsor with ID ${queryStringParameters.id} not found.` });
                    }
                    return constructResponse(200, sponsor);
                } else {
                    const sponsors = await getAllSponsors();
                    if (sponsors.length === 0) {
                        return constructResponse(404, { message: "No sponsors found." });
                    }
                    return constructResponse(200, sponsors);
                }

            case "POST":
                const { files, fields } = await parseFormData(event);

                const imageUrl = files['image'] ? await fileUploadService.upload(files['image'], 'image/jpeg') : undefined;
                const logoUrl = files['logo'] ? await fileUploadService.upload(files['logo'], 'image/jpeg') : undefined;
                const videoUrl = files['video'] ? await fileUploadService.upload(files['video'], 'video/mp4') : undefined;

                const newSponsorData = {
                    ...fields,
                    image: imageUrl,
                    logo: logoUrl,
                    video: videoUrl,
                };

                const newSponsor = await createSponsor(newSponsorData);
                return constructResponse(201, newSponsor);

            case "PUT":
                if (!queryStringParameters?.id) {
                    return constructResponse(400, { message: "Missing sponsor ID in query string." });
                }

                const { files: updateFiles, fields: updateFields } = await parseFormData(event);
                
                const updateData = {
                    ...updateFields,
                    image: updateFiles['image'] ? await fileUploadService.upload(updateFiles['image'], 'image/jpeg') : undefined,
                    logo: updateFiles['logo'] ? await fileUploadService.upload(updateFiles['logo'], 'image/jpeg') : undefined,
                    video: updateFiles['video'] ? await fileUploadService.upload(updateFiles['video'], 'video/mp4') : undefined,
                };

                await updateSponsor(queryStringParameters.id, updateData);
                return constructResponse(200, { message: "Sponsor updated successfully." });

            case "DELETE":
                if (!queryStringParameters?.id) {
                    return constructResponse(400, { message: "Missing sponsor ID in query string." });
                }

                await deleteSponsor(queryStringParameters.id);
                return constructResponse(204, null);

            default:
                return constructResponse(405, { message: "Method Not Allowed" });
        }
    } catch (error: any) {
        console.error("Error processing request:", error);
        return constructResponse(500, { message: "Internal Server Error", error: error.message });
    }
};
