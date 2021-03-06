export enum CRUD {
    create,
    read,
    update,
    delete,
    nothing
}

export interface ListItem {
    id?: string,
    title?: string,
    description?: string,
    tags?: string[],
    createdAt?: string
}

export interface ModalProps {
    item: ListItem,
    action: CRUD,
    active: boolean
}
