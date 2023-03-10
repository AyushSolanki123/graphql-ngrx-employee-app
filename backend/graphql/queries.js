const Employee = require("../model/Employee").model;

const queries = {
    listEmployee: async () => {
        const employees = await Employee.find({ isDeleted: false });
        return employees.map((e) => {
            return {
                ...e._doc,
                _id: e._id.toString(),
            };
        });
    },
    getEmployee: async (_, { id }) => {
        const employee = await Employee.findOne({
            id,
            isDeleted: false,
        });
        return {
            ...employee._doc,
            _id: employee._id.toString(),
        };
    },
};

module.exports = queries;
