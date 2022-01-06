const db = require("../Models");
const VHS = db.VHS;
const Op = db.Sequelize.Op;

// Create and save a VHS
exports.create = (req, res) => {
  // Validate request
  if (!req.body.title) {
    res.status(400).send({
      message: "content cannot be empty",
    });
    return;
  }

  // Create a VHS
  const vhs = {
    title: req.body.title,
    description: req.body.description,
    price: req.body.price,
  };

  // Save VHS in db
  VHS.create(vhs)
    .then((data) => {
      res.send(data);
    })
    .catch((err) => {
      res.status(500).send({
        message: err.message || "Error while creating VHS",
      });
    });
};

// Retrieve all VHS from the database
exports.findAll = (req, res) => {
  const title = req.query.title;
  var condition = title ? { title: { [Op.like]: `%${title}` } } : null;

  VHS.findAll({ where: condition })
    .then((data) => {
      res.send(data);
    })
    .catch((err) => {
      res.status(500).send({
        message: err.message || "Error while retrieving VHS",
      });
    });
};

// Find a single VHS with unique id
exports.findOne = (req, res) => {
  const id = req.params.id;

  VHS.findByPk(id)
    .then((data) => {
      if (data) {
        res.send(data);
      } else {
        res.status(404).send({
          message: `Cannot find VHS with id ${id}`,
        });
      }
    })
    .catch((err) => {
      res.status(500).send({
        message: `Error receiving VHS with id ${id}`,
      });
    });
};

// Update tutorial with unique id
exports.update = (req, res) => {
  const id = req.params.id;

  VHS.update(req.body, {
    where: { id: id },
  })
    .then((num) => {
      if (num == 1) {
        res.send({
          message: "VHS uodated successfully",
        });
      } else {
        res.send({
          message: "Cannot update VHS",
        });
      }
    })
    .catch((err) => {
      res.status(500).send({
        message: "Error updated VHS",
      });
    });
};

// Delete VHS from the database with unique id
exports.deleteOne = (req, res) => {
  const id = req.params.id;

  VHS.destroy({
    where: { id: id },
  })
    .then((num) => {
      if (num == 1) {
        res.send({ message: "VHS deleted" });
      } else {
        res.send({ message: "Cannot delete VHS" });
      }
    })
    .catch((err) => {
      res.status(500).send({
        message: "Could not delete VHS",
      });
    });
};
