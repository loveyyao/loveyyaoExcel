import {Sheet} from '../types'

export interface StoreOptions {
  showTopLetter?: boolean
  showLeftIndex?: boolean
  letterHeight: number
  indexWidth: number
  defaultFill: string
  defaultStroke: string
  defaultRowHeight: string
  defaultColWidth: string
  defaultRows: string
  defaultCols: string
  cellFill: string
  cellStroke: string
  cellActiveFill: string
  cellActiveStroke: string
  container: HTMLElement // 容器
  sheets?: Sheet[] // Sheet
  showSheet: Sheet
}

export class Store {
  private static instance: Store
  // @ts-ignore
  private showTopLetter: boolean
  // @ts-ignore
  private showLeftIndex: boolean
  // @ts-ignore
  private letterHeight: number
  // @ts-ignore
  private indexWidth: number
  // @ts-ignore
  private defaultFill: string
  // @ts-ignore
  private defaultStroke: string
  // @ts-ignore
  private defaultRowHeight: string
  // @ts-ignore
  private defaultColWidth: string
  // @ts-ignore
  private defaultRows: string
  // @ts-ignore
  private defaultCols: string
  // @ts-ignore
  private cellFill: string
  // @ts-ignore
  private cellStroke: string
  // @ts-ignore
  private cellActiveFill: string
  // @ts-ignore
  private cellActiveStroke: string
  // @ts-ignore
  private root: HTMLElement // 容器
  // @ts-ignore
  private sheets: Sheet[]
  // @ts-ignore
  private showSheet: Sheet
  private constructor(options: StoreOptions) {
    this.showTopLetter = options.showTopLetter
    this.showLeftIndex = options.showLeftIndex
    this.letterHeight = options.letterHeight
    this.indexWidth = options.indexWidth
    this.defaultFill = options.defaultFill
    this.defaultStroke = options.defaultStroke
    this.defaultRowHeight = options.defaultRowHeight
    this.defaultColWidth = options.defaultColWidth
    this.defaultRows = options.defaultRows
    this.defaultCols = options.defaultCols
    this.cellFill = options.cellFill
    this.cellStroke = options.cellStroke
    this.cellActiveFill = options.cellActiveFill
    this.cellActiveStroke = options.cellActiveStroke
    this.root = options.container
    this.sheets = options.sheets
    this.showSheet = options.showSheet
  }
  static getInstance() {
    return Store.instance
  }
  static initStore(options: StoreOptions) {
    if (Store.instance) {
      console.warn('Store 只能初始化一次')
      return Store.instance
    }
    Store.instance = new Store(options)
    return Store.instance
  }
  // @ts-ignore
  private setStoreValue(key: keyof StoreOptions, value: any) {
    this[key] = value
  }
  // @ts-ignore
  private getStoreValue(key: string) {
    return this[key]
  }
}
