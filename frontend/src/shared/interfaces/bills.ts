export interface Bill {
    id: number;
    name: string;
    value: number;
    dueDate: string;
    originOfPurchase: string;
    status: BillStatus;
    priority: BillPriority;
    relationalCode: number;
    modified: string;
    created: string;
    // recurrent: boolean;
    // só é válida para contas recorrentesda lista prórp
}

export interface BillStatus {
    Pendente: 'Pendente',
    Pago: 'Pago',
    Vencida: 'Vencida'
}

export interface BillPriority {
    High: 'High',
    Medium: 'Medium',
    Low: 'Low'
}

export interface GenericBill {
    id?: number;
    name?: string;
    value?: number;
    dueDate?: string;
    originOfPurchase?: string;
    status?: BillStatus;
    priority?: BillPriority;
    relationalCode?: number;
    created?: string;
    modified?: string;
    recurrent?: boolean;
}