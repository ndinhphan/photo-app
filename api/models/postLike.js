module.exports = (sequelize, DataTypes) => {
  const PostLike = sequelize.define('PostLike', {
    id: {
      allowNull: false,
      autoIncrement: true,
      primaryKey: true,
      type: DataTypes.INTEGER,
    },

  });
  PostLike.associate = (models) => {
    PostLike.belongsTo(models.User, { foreignKey: { name: 'userId', allowNull: false }, as: 'user', onDelete: 'CASCADE' });
    PostLike.belongsTo(models.Post, { foreignKey: { name: 'postId', allowNull: false }, as: 'post', onDelete: 'CASCADE' });
  };
  return PostLike;
};
