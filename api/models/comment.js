module.exports = (sequelize, DataTypes) => {
  const Comment = sequelize.define('Comment', {
    id: {
      allowNull: false,
      autoIncrement: true,
      primaryKey: true,
      type: DataTypes.INTEGER,
    },
    content: DataTypes.STRING,
  });
  Comment.associate = (models) => {
    Comment.belongsTo(models.User, { foreignKey: 'userId', as: 'author' });
    Comment.belongsTo(models.Post, { foreignKey: 'postId', as: 'post' });
  };
  return Comment;
};
