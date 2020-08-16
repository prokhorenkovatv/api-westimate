"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const sequelize_1 = require("sequelize");
exports.default = (sequelize) => {
    class User extends sequelize_1.Model {
    }
    User.listWithTeams = async (models) => {
        // const teams = await models.User_Team.getTeams()
        const users = await User.findAll({
            // attributes: ["id", "first_name", "last_name"],
            where: { role: "member" },
            include: {
                model: models.Team,
                attributes: ["team_name", "id"],
                through: { attributes: [] },
            },
        });
        console.log("List with teams", users);
        return users.map(user => ({
            id: user.id,
            username: `${user.first_name} ${user.last_name}`,
            email: user.email,
            teams: user.Teams,
        }));
    };
    User.init({
        first_name: sequelize_1.DataTypes.STRING,
        last_name: sequelize_1.DataTypes.STRING,
        phone: sequelize_1.DataTypes.STRING,
        role: {
            type: sequelize_1.DataTypes.ENUM("member", "admin"),
            defaultValue: "member",
        },
        email: {
            type: sequelize_1.DataTypes.STRING,
            unique: true,
            validate: {
                isEmail: true,
            },
        },
        password: sequelize_1.DataTypes.STRING,
        gender: sequelize_1.DataTypes.TINYINT,
        onboarding_at: sequelize_1.DataTypes.DATE,
    }, {
        sequelize: sequelize,
        modelName: "User",
    });
    return User;
};
