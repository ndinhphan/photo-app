module.exports = (sequelize, DataTypes) => {
  const Comment = sequelize.define('Comment', {
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
  Comment.associate = (models) => {
    Comment.belongsTo(models.User, { foreignKey: { name: 'userId', allowNull: false }, as: 'author', onDelete: 'CASCADE' });
    Comment.belongsTo(models.Post, { foreignKey: { name: 'postId', allowNull: false }, as: 'post', onDelete: 'CASCADE' });
  };
  return Comment;
};
