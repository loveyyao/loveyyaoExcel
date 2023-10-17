import * as zrender from 'zrender';
import { HeaderOptions } from '../types';
export declare class Header extends zrender.Group {
    private _options;
    private headerCellList;
    private listeners;
    private activeCell;
    private store;
    constructor(options: HeaderOptions);
    private init;
    private refresh;
    private addEvent;
    private initEvent;
    private removeEvent;
    private setActiveByIndex;
}
