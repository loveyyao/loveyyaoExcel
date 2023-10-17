import { Options } from './types';
export declare class LoveyyaoExcel {
    private _options;
    private tableTopHeader;
    private tableLeftHeader;
    private zr;
    private table;
    private store;
    private tableLeftTopHeader;
    constructor(options: Options);
    private initStore;
    private getSheetColRowNum;
    private getSheet;
    private initHeader;
    private initSheet;
    private changeSheet;
}
