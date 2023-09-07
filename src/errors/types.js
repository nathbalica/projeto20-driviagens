export function conflictError(resource = "Item") {
    const error = new Error(`${resource} já existe!`);
    error.type = "ConflictError";
    return error;
}

export function incompleteDataError() {
    const error = new Error(`Preencha todos os dados!`);
    error.type = "incompleteData";
    return error;
}

export function notFoundError(resource = "Item") {
    const error = new Error(`${resource} não encontrado!`);
    error.type = "ResourceNotFound";
    return error;
}


