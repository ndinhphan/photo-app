module.exports = (sequelize, DataTypes) => {
  const User = sequelize.define('User', {
    id: {
      allowNull: false,
      autoIncrement: true,
      primaryKey: true,
      type: DataTypes.INTEGER,
    },
    username: DataTypes.STRING,
    firstname: DataTypes.STRING,
    lastname: DataTypes.STRING,
    email: DataTypes.STRING,
    password: DataTypes.STRING,
    source: DataTypes.STRING,
    description: DataTypes.STRING,
  });
  User.associate = (models) => {
    User.hasMany(models.Post, { foreignKey: { name: 'userId', allowNull: false }, as: 'posts', onDelete: 'CASCADE' });
  };
  return User;
};
