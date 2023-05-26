import { Model, DataTypes, CreationOptional, InferAttributes, InferCreationAttributes } from 'sequelize';
import sequelize from '.';
import UserModel from './user';

interface RecordModel extends Model<InferAttributes<RecordModel>, InferCreationAttributes<RecordModel>> {
  id: CreationOptional<number>;
  date: Date;
  text: string;
  mediaPath: string;
}

const RecordModel = sequelize.define<RecordModel>('Record', {
  id: {
    primaryKey: true,
    type: DataTypes.INTEGER.UNSIGNED,
    autoIncrement: true,
    allowNull: false
  },
  date: {
    type: DataTypes.DATE,
    allowNull: false
  },
  text: {
    type: DataTypes.STRING,
    allowNull: true,
  },
  mediaPath: {
    type: DataTypes.STRING,
    allowNull: true
  }
}, {timestamps: true});

UserModel.hasMany(RecordModel, { onDelete: "cascade" });
RecordModel.belongsTo(UserModel);

export default RecordModel;