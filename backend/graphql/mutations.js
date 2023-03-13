const Employee = require("../model/Employee").model;

const mutations = {
    addEmployee: async ({ input }) => {
        const count = await Employee.find({}).count();
        const employee = await Employee.create({
            id: count + 1001,
            ...input,
        });
        return {
            ...employee._doc,
            _id: employee._id.toString(),
        };
    },
    updateEmployee: async ({ input }) => {
        const { id, ...reqBody } = input;
        const employee = await Employee.findOne({ isDeleted: false, id: id });

        if (!employee) {
            throw new Error(`Employee with id: ${id} not found`);
        }

        const updatedEmployee = await Employee.findOneAndUpdate(
            { id: id },
            { $set: reqBody },
            { new: true }
        );
        return {
            ...updatedEmployee._doc,
            _id: updatedEmployee._id.toString(),
        };
    },
    deleteEmployee: async ({ id }) => {
        const employee = await Employee.findOne({ isDeleted: false, id: id });

        if (!employee) {
            throw new Error(`Employee with id: ${id} not found`);
        }

        const deletedEmployee = await Employee.findOneAndUpdate(
            { id: id },
            { $set: { isDeleted: true } },
            { new: true }
        );

        return {
            ...deletedEmployee._doc,
            _id: deletedEmployee._id.toString(),
        };
    },
};

module.exports = mutations;
