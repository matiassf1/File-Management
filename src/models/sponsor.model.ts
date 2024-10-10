import dynamoose from "dynamoose";

const sponsorSchema = new dynamoose.Schema({
  id: { type: String, hashKey: true },
  tier: { type: String, required: true },
  video: { type: String },
  image: { type: String },
  logo: { type: String, required: true },
});

export const Sponsor = dynamoose.model("sponsors", sponsorSchema);
