import httpStatus from "http-status";

export default function errorHandler(error, req, res, next) {
    console.log(error);

    if (error.type === "ValidationError") {
        return res.status(httpStatus.UNPROCESSABLE_ENTITY).send(error.message || "Erro de validação.");
    }

    if (error.type === "incompleteData") {
        return res.status(httpStatus.UNPROCESSABLE_ENTITY).send(error.message);
    }

    if (error.type === "ResourceNotFound") {
        return res.status(httpStatus.NOT_FOUND).send(error.message || "Recurso não encontrado.");
    }

    if (error.type === "ConflictError") {
        return res.status(httpStatus.CONFLICT).send(error.message || "Conflito encontrado.");
    }

    if (error.type === "AuthenticationError") {
        return res.status(httpStatus.UNAUTHORIZED).send(error.message || "Erro de autenticação.");
    }

    if (error.type === "AuthorizationError") {
        return res.status(httpStatus.FORBIDDEN).send(error.message || "Erro de autorização.");
    }

    if (error.type === "BadRequestError") {
        return res.status(httpStatus.BAD_REQUEST).send(error.message || "Requisição inválida.");
    }

    if (error.type === "RateLimitError") {
        return res.status(httpStatus.TOO_MANY_REQUESTS).send(error.message || "Muitas solicitações. Tente novamente mais tarde.");
    }

    if (error.type === "QueryError") {
        return res.status(httpStatus.UNPROCESSABLE_ENTITY).send(error.message || "Invalid query parameters.");
    }

    // Caso nenhum dos tipos acima corresponda:
    res.status(httpStatus.INTERNAL_SERVER_ERROR).send("Sorry, something went wrong 😢");
}
