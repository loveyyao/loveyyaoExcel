import * as zrender from 'zrender'
import {CellOptions} from '../types'
import type {
  Rect,
  GroupProps,
  RectProps
} from 'zrender'
import config from '../config'

export class Cell extends zrender.Group {
  private _options: CellOptions
  private cellRect: Rect
  private text: zrender.Text
  private cellBorder: zrender.Line[]

  constructor(options: CellOptions) {
    const superOptions = {
      x: options.x * options.width,
      y: options.y * options.height
    }
    super(superOptions as GroupProps)
    this._options = options
    this.init()
  }

  private init() {
    this.initRect()
    this.initText()
    this.initCellBorder()
  }

  private initRect() {
    const rectOpt = {
      shape: {
        x: 1,
        y: 1,
        width: this._options.width * 2,
        height: this._options.height * 2
      },
      style: {
        fill: this._options.fill || config.defaultFill,
        stroke: this._options.stroke || config.defaultStroke,
        lineWidth: 2
      },
      cursor: 'default',
      scaleX: 0.5,
      scaleY: 0.5
    } as RectProps
    this.cellRect = new zrender.Rect(rectOpt)
    this.add(this.cellRect)
  }
  private initCellBorder() {
    const top = new zrender.Line({
      shape: {
        x1: 0,
        y1: 0,
        x2: this._options.width,
        y2: 0,
      },
      style: {
        stroke: 'none'
      }
    })
    const right = new zrender.Line({
      shape: {
        x1: this._options.width,
        y1: 0,
        x2: this._options.width,
        y2: this._options.height,
      },
      style: {
        stroke: 'none'
      }
    })
    const bottom = new zrender.Line({
      shape: {
        x1: 0,
        y1: this._options.height,
        x2: this._options.width,
        y2: this._options.height,
      },
      style: {
        stroke: 'none'
      }
    })
    const left = new zrender.Line({
      shape: {
        x1: 0,
        y1: 0,
        x2: 0,
        y2: this._options.height,
      },
      style: {
        stroke: 'none'
      }
    })
    this.cellBorder = [top, right, bottom, left]
    this.cellBorder.forEach(border => {
      this.add(border)
    })
  }
  private initText() {
    const num: number = this._options.height - (this._options?.textProps?.style?.fontSize as number) || 12
    this._options.textProps.style = Object.assign(this._options?.textProps?.style ?? {}, {
      width: this._options.width,
      align: 'center',
      height: this._options.height,
      x: this._options.width / 2,
      y: (num / 2 + 2) as number
    })
    this.text = new zrender.Text(this._options.textProps)
    this.add(this.text)
  }
  // @ts-ignore
  private setText(text: string) {
    this.text.attr('style', { text })
  }
  // @ts-ignore
  private setBorderColor(colors: string[]) {
    this.cellBorder.forEach((border, index: number) => {
      if (colors[index]) {
        border.attr('style', { stroke: colors[index] })
        border.attr('z', 99)
      }
    })
  }
  // @ts-ignore
  private clearBorderColor() {
    this.cellBorder.forEach((border) => {
      border.attr('style', { stroke: 'none' })
      border.attr('z', 1)
    })
  }
  // @ts-ignore
  private setCellFill(fill: string) {
    this.cellRect.attr('style', { fill })
  }
}
