const { Kind } = require("graphql/language");
const { GraphQLScalarType } = require("graphql");

function serializeDate(value) {
    if (value instanceof Date) {
        return value.getTime();
    } else if (typeof value === "number") {
        return Math.trunc(value);
    } else if (typeof value === "string") {
        return Date.parse(value);
    }
    return null;
}

function parseDate(value) {
    if (value === null) {
        return null;
    }

    try {
        return new Date(value);
    } catch (err) {
        return null;
    }
}

function parseDateFromLiteral(ast) {
    if (ast.kind === Kind.INT) {
        const num = parseInt(ast.value, 10);
        return new Date(num);
    } else if (ast.kind === Kind.STRING) {
        return parseDate(ast.value);
    }
    return null;
}

const TimestampType = new GraphQLScalarType({
    name: "Timestamp",
    description:
        "The javascript `Date` as integer. Type represents date and time " +
        "as number of milliseconds from start of UNIX epoch.",
    serialize: serializeDate,
    parseValue: parseDate,
    parseLiteral: parseDateFromLiteral,
});

module.export = TimestampType;
