const { default: mongoose } = require("mongoose");
const Schema = mongoose.Schema;

const EmployeeSchema = new Schema(
    {
        id: {
            type: Schema.Types.Number,
            required: true,
        },
        firstName: {
            type: Schema.Types.String,
            required: true,
        },
        lastName: {
            type: Schema.Types.String,
        },
        email: {
            type: Schema.Types.String,
            required: true,
        },
        password: {
            type: Schema.Types.String,
            required: true,
        },
        dob: {
            type: Schema.Types.String,
            required: true,
        },
        company: {
            type: Schema.Types.String,
            required: true,
        },
        isDeleted: {
            type: Schema.Types.Boolean,
            required: true,
            default: false,
        },
    },
    {
        versionKey: false,
    }
);

module.exports = {
    model: mongoose.model("Employee", EmployeeSchema),
};
