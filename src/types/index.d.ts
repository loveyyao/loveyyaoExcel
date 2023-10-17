import type {
  PathStyleProps,
  TextStyleProps,
  TextProps
} from 'zrender'

export interface Options{
  container: HTMLElement // 容器
  showTopLetter?: boolean // 是否显示头部字母
  showLeftIndex?: boolean // 是否显示行号
  sheets?: Sheet[] // Sheet
}

export interface Sheet{
  name?: string // name
  index?: number // index
  status?: 1 | 0 // 激活状态
  order?: number // 排序
  data?: Cell[] // 数据
  row?: number // 行数
  col?: number // 列数
  defaultRowHeight?: number // 行高
  defaultColWidth?: number // 列宽
}

export interface Cell {
  name?: string
  x: number
  y: number
  v?: number | string // 显示的值
  style?: PathStyleProps // 单元格样式
  textStyle?: TextStyleProps // 文字样式
}

export interface CellOptions {
  type: 'cell' | 'col' | 'row' | ''
  name?: string
  textProps?: TextProps
  width: number
  height: number
  x: number
  y: number
  fill?: string
  stroke?: string
  border?: CellBorder[]
}
type CellBorder = CellBorderItem | null

export interface CellBorderItem {
  stroke?: string
}

export interface HeaderOptions{
  type: 'col' | 'row'
  fill?: string
  stroke?: string
}
