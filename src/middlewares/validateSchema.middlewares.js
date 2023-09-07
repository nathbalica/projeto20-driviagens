import { stripHtml } from 'string-strip-html';

export function validateSchema(schema) {
    return function (req, res, next) {
        const cleanData = {};

        for (const [key, value] of Object.entries(req.body)) {
            cleanData[key] = typeof value === 'string' ? stripHtml(value).result.trim() : value;
        }

        const { error } = schema.validate(cleanData, { abortEarly: false });

        if (error) {
            const errorMessage = error.details.map((detail) => detail.message).join(" ");
            const errorToThrow = new Error(errorMessage);
            errorToThrow.type = 'ValidationError';
            throw errorToThrow;
        } else {
            req.body = cleanData; // Opcional: se você quiser substituir o req.body pelos dados limpos.
            next();
        }
    };
}
