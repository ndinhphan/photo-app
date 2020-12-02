module.exports = (sequelize, DataTypes) => {
  const Post = sequelize.define('Post', {
    id: {
      allowNull: false,
      autoIncrement: true,
      primaryKey: true,
      type: DataTypes.INTEGER,
    },
    source: DataTypes.STRING,
    description: DataTypes.STRING,
    visibility: DataTypes.STRING,
  });
  Post.associate = (models) => {
    Post.belongsTo(models.User, { foreignKey: { name: 'userId', allowNull: false }, as: 'author', onDelete: 'CASCADE' });
    Post.hasMany(models.Comment, { foreignKey: { name: 'postId', allowNull: false }, as: 'comments', onDelete: 'CASCADE' });
  };
  return Post;
};
