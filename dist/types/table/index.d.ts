import * as zrender from 'zrender';
export declare class Table extends zrender.Group {
    private tableCellList;
    private listeners;
    private activeCell;
    private store;
    constructor();
    private renderSheet;
    private getCellText;
    private initEvent;
    private addEvent;
}
