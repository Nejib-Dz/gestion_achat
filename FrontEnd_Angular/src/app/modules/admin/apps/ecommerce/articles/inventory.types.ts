export interface InventoryProduct
{
    id?: string;
    category?: string;
    name?: string;
    description?: string;
    tags?: string[];
    barcode?: string | null;
    brand?: string | null;
    vendor: string | null;
    stock: number;
    sku?: string | null;
    reserved: number;
    cost: number;
    dateAdded:Date;
    quantity:number;
    taxPercent: number;
    price: number;
    weight: number;
    active: boolean;
}

 export interface InventoryPagination
{
    length: number;
    size: number;
    page: number;
    lastPage: number;
    startIndex: number;
    endIndex: number;
}

export interface InventoryCategory
{
    id: string;
    parentId: string;
    name: string;
    slug: string;
}

export interface InventoryBrand
{
    id: string;
    name: string;
    slug: string;
}

export interface InventoryTag
{
    id?: string;
    title?: string;
}

export interface InventoryVendor
{
    id: string;
    name: string;
    slug: string;
}

