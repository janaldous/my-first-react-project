
export interface InventoryItem {
    employee: number,
    id: number,
    name: string,
    dateAllocated: string,
}

export class InventoryService {
    static items: Array<InventoryItem> = [{
        employee: 1,
        id: 1,
        name: "Mouse",
        dateAllocated: "2019-08-08"
    }, {
        employee: 1,
        id: 2,
        name: "Monitor",
        dateAllocated: "2019-08-18"
    }, {
        employee: 1,
        id: 3,
        name: "Headphones",
        dateAllocated: "2019-08-28"
    }, {
        employee: 2,
        id: 4,
        name: "Laptop",
        dateAllocated: "2019-08-28"
    }];

    static getItemByEmployee(id: number) {
        return InventoryService.items.filter(x => x.employee === id);
    }

    static getItemById(id: number) {
        return InventoryService.items.filter(x => x.id === id)[0];
    }

    static getAllItems() {
        return InventoryService.items;
    }

    static saveItem(item: InventoryItem) {
        InventoryService.items.push(item);
    }
}