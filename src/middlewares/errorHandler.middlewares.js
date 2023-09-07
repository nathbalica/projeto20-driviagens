import httpStatus from 'http-status';

function errorHandler(err, req, res, next) {
    let statusCode;
    let message;

    switch (err.type) {
        case 'ValidationError':
            statusCode = httpStatus.UNPROCESSABLE_ENTITY;
            message = err.message || "Erro de validação.";
            break;
        case 'ResourceNotFound':
            statusCode = httpStatus.NOT_FOUND;
            message = err.message || "Recurso não encontrado.";
            break;
        case 'ConflictError':
            statusCode = httpStatus.CONFLICT;
            message = err.message || "Conflito encontrado.";
            break;
        case 'AuthenticationError':
            statusCode = httpStatus.UNAUTHORIZED;
            message = err.message || "Erro de autenticação.";
            break;
        case 'AuthorizationError':
            statusCode = httpStatus.FORBIDDEN;
            message = err.message || "Erro de autorização.";
            break;
        case 'BadRequest':
            statusCode = httpStatus.BAD_REQUEST;
            message = err.message || "Requisição inválida.";
            break;
        case 'RateLimitError':
            statusCode = httpStatus.TOO_MANY_REQUESTS;
            message = err.message || "Muitas solicitações. Tente novamente mais tarde.";
            break;
        default:
            statusCode = httpStatus.INTERNAL_SERVER_ERROR;
            message = err.message || "Erro interno do servidor.";
            break;
    }

    res.status(statusCode).send({ message });
}

export default errorHandler;
