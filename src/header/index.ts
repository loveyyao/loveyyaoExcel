import * as zrender from 'zrender'
import {CellOptions, HeaderOptions} from '../types'
import {GroupProps, ElementEvent} from 'zrender'
import {Cell} from '../cell'
import {generateCode} from '../utils'
import {Store} from '../store'

interface HeaderEvent extends ElementEvent {
  cell?: Cell
  index: number
}

interface EventItem {
  name: string
  func: (e: HeaderEvent) => void
}

export class Header extends zrender.Group {
  private _options: HeaderOptions
  private headerCellList: any[]
  private listeners: EventItem[]
  private activeCell: Cell | null
  private store: any

  constructor(options: HeaderOptions) {
    const store: any = Store.getInstance()
    const superOptions = {
      x: options.type === 'col' ? store.indexWidth : 0,
      y: options.type === 'col' ? 0 : store.letterHeight
    } as GroupProps
    super(superOptions)
    this.store = store
    this._options = options
    this.headerCellList = []
    this.listeners = []
    this.activeCell = null
    this.init()
    this.initEvent()
  }

  private init() {
    this.headerCellList.forEach(e => {
      this.remove(e)
    })
    const type = this._options.type
    const num = type === 'col' ? this.store.defaultCols : this.store.defaultRows
    for (let i = 0; i < num; i++) {
      const options: CellOptions = {
        type: type,
        width: type === 'col' ? this.store.defaultColWidth : this.store.indexWidth,
        height: type === 'col' ? this.store.letterHeight : this.store.defaultRowHeight,
        x: type === 'col' ? i : 0,
        y: type === 'col' ? 0 : i,
        textProps: {
          style: {
            text: type === 'col' ? generateCode(i) : i + 1 + '',
            fontSize: 12,
            overflow: 'truncate'
          }
        }
      }
      const cell = new Cell(options)
      this.headerCellList.push(cell)
      this.add(cell)
    }
  }
  // @ts-ignore
  private refresh() {
    this.init()
  }

  // @ts-ignore
  private addEvent(eventName: string, func: (e: ElementEvent) => void) {
    this.listeners.push({
      name: eventName,
      func
    })
  }

  private initEvent() {
    this.on('click', (event: ElementEvent) => {
      let cell: any = null
      let index = -1
      this.headerCellList.forEach((c: any, i: number) => {
        c.clearBorderColor()
        c.setCellFill('#FFF')
        let target = event.target
        let flag = c.cellRect.id === target.id
        while (!flag && target.parent) {
          target = target.parent
          flag = c.id === target.id
        }
        if (flag) {
          cell = c
          index = i
          if (!this.activeCell || this.activeCell.id !== cell.id) {
            c.setCellFill('#F6F5F5FF')
            c.setBorderColor(this._options.type === 'col' ? [null, null, this.store.cellActiveStroke, null] : [null, this.store.cellActiveStroke, null, null])
            this.activeCell = cell
          } else {
            this.activeCell = null
          }
        }
      })
      const events = this.listeners.filter(e => e.name === 'click')
      if (events.length) {
        const headerEvent: HeaderEvent = {
          ...event,
          cell: cell,
          index: index
        }
        events.forEach(e => e.func(headerEvent))
      }
    })
  }

  // @ts-ignore
  private removeEvent(eventName: string, func: (e: ElementEvent) => void) {
    this.listeners = this.listeners.filter(e => e.name !== eventName && e.func !== func)
  }

  // @ts-ignore
  private setActiveByIndex(index: number) {
    this.headerCellList.forEach((c: any, i: number) => {
      c.clearBorderColor()
      if (i === index && index !== -1) {
        this.activeCell = c
        c.setBorderColor(this._options.type === 'col' ? [null, null, this.store.cellActiveStroke, null] : [null, this.store.cellActiveStroke, null, null])
        c.setCellFill('#F6F5F5FF')
      } else {
        c.clearBorderColor()
        c.setCellFill('#fff')
      }
    })
  }
}
