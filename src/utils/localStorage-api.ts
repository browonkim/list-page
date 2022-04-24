import {ListItem} from "@/types/common-types";

export function createItem(newItem: ListItem) {
    const data = getData()
    data.push(newItem)
    window.localStorage.setItem('data', JSON.stringify(data))
}

export function deleteItem(itemId: number) {
    const data = getData()
    const modifiedData = data.filter((item: ListItem) => item.id !== itemId)
    window.localStorage.setItem('data', JSON.stringify(modifiedData))
}

export function updateItem(updatedItem: ListItem) {
    const data = getData()
    const targetData = data.find((item: ListItem) => item.id === updatedItem.id)
    if (targetData === undefined) {
        return
    }
    targetData.title = updatedItem.title
    targetData.description = updatedItem.description
    targetData.tags = updatedItem.tags

    window.localStorage.setItem('data', JSON.stringify(data))
}

export function getData(): ListItem[] {
    const rawData = window.localStorage.getItem('data')
    if (rawData == null || rawData === '') {
        throw new Error('there is no data in local storage')
    }
    return JSON.parse(rawData) as Array<ListItem>
}
