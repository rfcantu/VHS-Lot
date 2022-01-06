module.exports = (app) => {
  const vhs = require("../Controllers/VHS.controller");

  var router = require("express").Router();

  // Create and save VHS
  router.post("/", vhs.create);

  // Retrieve all VHS
  router.get("/", vhs.findAll);

  // Retrieve single VHS
  router.get("/:id", vhs.findOne);

  // Update VHS
  router.put("/:id", vhs.update);

  // Delete one VHS
  router.delete("/:id", vhs.deleteOne);

  app.use("/api/vhs", router);
};
