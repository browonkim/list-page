export enum CRUD {
    create,
    read,
    update,
    delete
}

export interface ListItem {
    id: number,
    title: string,
    description: string,
    tags: string[],
    createdAt: string
}
