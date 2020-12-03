module.exports = (sequelize, DataTypes) => {
  const User = sequelize.define('User', {
    id: {
      allowNull: false,
      autoIncrement: true,
      primaryKey: true,
      type: DataTypes.INTEGER,
    },
    username: {
      type: DataTypes.STRING,
      notEmpty: true,
    },
    firstname: {
      type: DataTypes.STRING,
      notEmpty: true,
    },
    lastname: {
      type: DataTypes.STRING,
      notEmpty: true,
    },
    email: {
      type: DataTypes.STRING,
      is: /^[\w-.]+@([\w-]+\.)+[\w-]{2,4}$/g,
      notEmpty: true,
    },
    password: {
      type: DataTypes.STRING,
      notEmpty: true,
    },
    source: {
      type: DataTypes.STRING,
      notEmpty: true,
    },
    description: DataTypes.STRING,
  });
  User.associate = (models) => {
    User.hasMany(models.Post, { foreignKey: { name: 'userId', allowNull: false }, as: 'posts', onDelete: 'CASCADE' });
  };
  return User;
};
