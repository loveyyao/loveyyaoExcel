import { Sheet } from '../types';
export interface StoreOptions {
    showTopLetter?: boolean;
    showLeftIndex?: boolean;
    letterHeight: number;
    indexWidth: number;
    defaultFill: string;
    defaultStroke: string;
    defaultRowHeight: string;
    defaultColWidth: string;
    defaultRows: string;
    defaultCols: string;
    cellFill: string;
    cellStroke: string;
    cellActiveFill: string;
    cellActiveStroke: string;
    container: HTMLElement;
    sheets?: Sheet[];
    showSheet: Sheet;
}
export declare class Store {
    private static instance;
    private showTopLetter;
    private showLeftIndex;
    private letterHeight;
    private indexWidth;
    private defaultFill;
    private defaultStroke;
    private defaultRowHeight;
    private defaultColWidth;
    private defaultRows;
    private defaultCols;
    private cellFill;
    private cellStroke;
    private cellActiveFill;
    private cellActiveStroke;
    private root;
    private sheets;
    private showSheet;
    private constructor();
    static getInstance(): Store;
    static initStore(options: StoreOptions): Store;
    private setStoreValue;
    private getStoreValue;
}
