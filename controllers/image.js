const Clarifai = require("clarifai");
const { ClarifaiStub, grpc } = require("clarifai-nodejs-grpc");

const stub = ClarifaiStub.grpc();
const metadata = new grpc.Metadata();

metadata.set("authorization", "Key b8556226077b4992bd337bd7a5fbfa5b");

const handleApiCall = (req, res) => {
  const { input } = req.body;

  stub.PostModelOutputs(
    {
      model_id: Clarifai.FACE_DETECT_MODEL,
      inputs: [{ data: { image: { url: input } } }],
    },
    metadata,
    (err, response) => {
      if (err || response.status.code !== 10000)
        return res.status(400).json("Unable to work with api.");
      res.json(response);
    }
  );
};

const handleImage = (db) => (req, res) => {
  const { id } = req.body;
  db("users")
    .where("id", "=", id)
    .increment("entries", 1)
    .returning("entries")
    .then((entries) => res.json(entries[0].entries))
    .catch((err) => res.status(400).json("unable to get entries."));
};

module.exports = { handleImage, handleApiCall };
