module.exports = (sequelize, DataTypes) => {
  const Post = sequelize.define('Post', {
    id: {
      allowNull: false,
      autoIncrement: true,
      primaryKey: true,
      type: DataTypes.INTEGER,
    },
    source: {
      type: DataTypes.STRING,
      notEmpty: true,
    },
    description: DataTypes.STRING,
    visibility: {
      type: DataTypes.STRING,
      notEmpty: true,
    },
  });
  Post.associate = (models) => {
    Post.belongsTo(models.User, { foreignKey: { name: 'userId', allowNull: false }, as: 'author', onDelete: 'CASCADE' });
    Post.hasMany(models.Comment, { foreignKey: { name: 'postId', allowNull: false }, as: 'comments', onDelete: 'CASCADE' });
    Post.hasMany(models.PostLike, { foreignKey: { name: 'postId', allowNull: false }, as: 'postLikes', onDelete: 'CASCADE' });
  };
  return Post;
};
