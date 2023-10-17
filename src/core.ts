import * as zrender from 'zrender'
import {Options, Sheet} from './types'
import {Header} from './header'
import {Cell} from './cell'
import config from './config'
import {Table} from './table'
import {Store} from './store'

export class LoveyyaoExcel {
  // @ts-ignore
  private _options: Options
  private tableTopHeader: Header
  private tableLeftHeader: Header
  private zr: any
  private table: Table
  // @ts-ignore
  private store: Store
  // @ts-ignore
  private tableLeftTopHeader: Cell

  constructor(options: Options) {
    this._options = options
    this.zr = zrender.init(options.container)
    this.initStore()
    this.initHeader()
    this.initSheet()
  }

  private initStore() {
    const sheets = (this._options.sheets || [this.getSheet(0)]).map((e, index) => {
      e.name = e.name || 'sheet' + (index + 1)
      e.index = e.index || index
      e.status = e.status || index === 0 ? 1 : 0
      return e
    })
    const storeOptions: any = Object.assign(config, this._options)
    storeOptions.sheets = sheets
    storeOptions.showSheet = sheets[0]
    storeOptions.defaultCols = this.getSheetColRowNum(sheets[0]).cols
    storeOptions.defaultRows = this.getSheetColRowNum(sheets[0]).rows
    this.store = Store.initStore(storeOptions)
  }

  private getSheetColRowNum(sheet: Sheet) {
    const data = sheet?.data ?? []
    let cols = sheet.col || 0
    let rows = sheet.row || 0
    data.forEach(e => {
      if (e.x > cols) {
        cols = e.x
      }
      if (e.y > rows) {
        rows = e.y
      }
    })
    cols = (cols || config.defaultCols) + 1
    rows = (rows || config.defaultRows) + 1
    return {
      cols,
      rows
    }
  }

  private getSheet(index: number) {
    const sheet: Sheet = {
      name: 'sheet' + (index + 1),
      index,
      status: 1,
      order: index,
      data: [],
      row: config.defaultRows,
      col: config.defaultCols,
      defaultRowHeight: config.defaultRowHeight,
      defaultColWidth: config.defaultColWidth
    }
    return sheet
  }

  private initHeader() {
    if (this._options.showTopLetter) {
      this.tableTopHeader = new Header({
        type: 'col'
      })
      this.zr.add(this.tableTopHeader)
    }
    if (this._options.showLeftIndex) {
      this.tableLeftHeader = new Header({
        type: 'row'
      })
      this.zr.add(this.tableLeftHeader)
    }
    if (this._options.showTopLetter && this._options.showLeftIndex) {
      this.tableLeftTopHeader = new Cell({
        type: '',
        width: config.indexWidth,
        height: config.letterHeight,
        x: 0,
        y: 0,
        textProps: {
          style: {}
        }
      })
      this.zr.add(this.tableLeftTopHeader)
    }
  }

  private initSheet() {
    this.table = new Table()
    this.zr.add(this.table);
    (this.table as any).addEvent('click', () => {
      const cell: any = (this.table as any).activeCell
      if (cell) {
        const x = cell._options.x
        const y = cell._options.y;
        (this.tableTopHeader as any)?.setActiveByIndex(x);
        (this.tableLeftHeader as any)?.setActiveByIndex(y)
      } else {
        (this.tableTopHeader as any)?.setActiveByIndex(-1);
        (this.tableLeftHeader as any)?.setActiveByIndex(-1)
      }
    })
  }

  // @ts-ignore
  private changeSheet(name: string) {
    const store: any = this.store
    const sheet = store.sheets.find(e => e.name === name)
    if (!sheet) {
      console.error(name + '工作簿不存在')
      return
    }
    const obj: any = this.getSheetColRowNum(sheet)
    store.setStoreValue('showSheet', sheet)
    store.setStoreValue('defaultRows', obj.rows)
    store.setStoreValue('defaultCols', obj.cols);
    (this.tableTopHeader as any)?.refresh();
    (this.tableLeftHeader as any)?.refresh();
    (this.table as any)?.renderSheet()
  }
}
