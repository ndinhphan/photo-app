module.exports = (sequelize, DataTypes) => {
  const Report = sequelize.define('Report', {
    id: {
      allowNull: false,
      autoIncrement: true,
      primaryKey: true,
      type: DataTypes.INTEGER,
    },
    content: {
      type: DataTypes.STRING,
      notEmpty: true,
    },

  });
  Report.associate = (models) => {
    Report.belongsTo(models.User, { foreignKey: { name: 'userId', allowNull: false }, as: 'user', onDelete: 'CASCADE' });
    Report.belongsTo(models.Post, { foreignKey: { name: 'postId', allowNull: false }, as: 'post', onDelete: 'CASCADE' });
  };
  return Report;
};
