export function conflictError(resource = "Item") {
    const error = new Error(`${resource}`);
    error.type = "ConflictError";
    return error;
}

export function incompleteDataError() {
    const error = new Error(`A data do voo deve ser maior do que a data atual!`);
    error.type = "incompleteData";
    return error;
}

export function notFoundError(resource = "Item") {
    const error = new Error(`${resource} not found!`);
    error.type = "ResourceNotFound";
    return error;
}

export function badRequestError(message = "Requisição inválida.") {
    const error = new Error(message);
    error.type = "BadRequestError"; // Nome consistente para o tipo de erro
    return error;
}

export function queryError(message = "Invalid query parameters.") {
    const error = new Error(message);
    error.type = "QueryError";
    return error;
}

export function tooManyResultsError() {
    const error = new Error("Too many results");
    error.type = "TooManyResultsError";
    return error;
}




