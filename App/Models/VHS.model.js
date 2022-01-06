module.exports = (sequelize, Sequelize) => {
  const VHS = sequelize.define("VHS", {
    title: {
      type: Sequelize.STRING,
    },
    description: {
      type: Sequelize.STRING,
    },
    price: {
      type: Sequelize.INTEGER,
    },
  });
  return VHS;
};
