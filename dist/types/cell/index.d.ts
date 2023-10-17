import * as zrender from 'zrender';
import { CellOptions } from '../types';
export declare class Cell extends zrender.Group {
    private _options;
    private cellRect;
    private text;
    private cellBorder;
    constructor(options: CellOptions);
    private init;
    private initRect;
    private initCellBorder;
    private initText;
    private setText;
    private setBorderColor;
    private clearBorderColor;
    private setCellFill;
}
