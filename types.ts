export type Page = 'dashboard' | 'upload' | 'search' | 'tasks' | 'history' | 'bankReport' | 'systemReport' | 'analytics' | 'userManagement' | 'settings';

export type ReconciliationStatus = 'all' | 'matched' | 'unmatchedSystem' | 'unmatchedBank' | 'discrepancy';

export interface SystemData {
    id: string; // Unique identifier
    uploadId: string; // Identifier for the upload batch
    sourceFile: string; // Name of the source file
    date: string;
    billNumber: string;
    licensePlate: string;
    status: string;
    contract: string;
    driver: string;
    destinationCity: string;
    originCity: string;
    destination: string;
    origin: string;
    preCarriage: number;
    postCarriage: number;
    freightCost: number;
    paidAmount: number;
    remainingBalance: number;
    vehicle: string;
}

export interface BankData {
    id: string; // Unique identifier
    uploadId: string; // Identifier for the upload batch
    sourceFile: string; // Name of the source file
    originAccount: string;
    originAccountHolder: string;
    destinationAccount: string;
    destinationAccountHolder: string;
    date: string;
    amount: number;
    pettyCashNumber: string;
    description: string;
    bankTrackingNumber: string;
    extractedBillNumber?: string;
}

export interface ReconciliationResult {
    systemStatus: Map<string, { status: ReconciliationStatus; linkedBankItems: BankData[] }>;
    bankStatus: Map<string, { status: ReconciliationStatus; linkedSystemItems: SystemData[] }>;
}

export interface Task {
    id: string;
    text: string;
    completed: boolean;
    reminder?: string; // ISO date string for the reminder
}

export interface ToastMessage {
    id: string;
    message: string;
    type: 'success' | 'error' | 'info';
}

export interface HistoryEntry {
    id: string;
    timestamp: string;
    action: string;
    details?: string;
}

export interface UploadHistory {
    id: string;
    timestamp: string;
    fileName: string;
    recordType: 'system' | 'bank';
    recordsAdded: number;
}

export interface User {
    id: string;
    name: string;
    username: string;
    password?: string; // Hashed password
    role: string;
    permissions: string[];
}