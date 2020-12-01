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
    Post.belongsTo(models.User, { foreignKey: 'userId', as: 'author' });
    Post.hasMany(models.Comment, { foreignKey: 'postId', as: 'comments' });
  };
  return Post;
};
