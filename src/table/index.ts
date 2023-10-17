import * as zrender from 'zrender'
import {ElementEvent} from 'zrender'
import {Cell} from '../cell'
import {Store} from '../store'
// import {generateCode} from '../utils'

interface HeaderEvent extends ElementEvent {
  cell?: Cell
  index: number
}

interface EventItem {
  name: string
  func: (e: HeaderEvent) => void
}

export class Table extends zrender.Group{
  // @ts-ignore
  private tableCellList: Cell[]
  private listeners: EventItem[]
  private activeCell: Cell | null
  private store: any
  constructor() {
    const store: any = Store.getInstance()
    const superOptions = {
      x: 0,
      y: 0
    } as any
    if (store.showLeftIndex && store.showTopLetter) {
      superOptions.x = store.indexWidth
      superOptions.y = store.letterHeight
    }
    super(superOptions)
    this.store = store
    this.tableCellList = []
    this.listeners = []
    this.renderSheet()
    this.initEvent()
  }

  private renderSheet() {
    this.tableCellList.forEach(e => {
      this.remove(e)
    })
    const cols = this.store.defaultCols || 0
    const rows = this.store.defaultRows || 0
    for (let i = 0; i < cols; i++) {
      for (let j = 0; j < rows; j++) {
        const text = this.getCellText(i, j)
        const cell = new Cell({
          type: 'cell',
          x: i,
          y: j,
          width: this.store.defaultColWidth,
          height: this.store.defaultRowHeight,
          textProps: {
            style: {
              text: text,
              fontSize: 12,
              overflow: 'truncate'
            }
          }
        })
        this.tableCellList.push(cell)
        this.add(cell)
      }
    }
  }
  private getCellText(x: number, y: number) {
    const sheet = this.store.showSheet
    const data = sheet?.data ?? []
    const cell = data.find(e => e.x === x && e.y === y)
    return cell ? cell.v : ''
  }
  private initEvent() {
    this.on('click', (event: ElementEvent) => {
      let cell: any = null
      let index = -1
      this.tableCellList.forEach((c: any, i: number) => {
        c.clearBorderColor()
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
            c.setBorderColor([
              this.store.cellActiveStroke,
              this.store.cellActiveStroke,
              this.store.cellActiveStroke,
              this.store.cellActiveStroke
            ])
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
  private addEvent(eventName: string, func: (e: ElementEvent) => void) {
    this.listeners.push({
      name: eventName,
      func
    })
  }
}
