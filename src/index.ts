import { LoveyyaoExcel } from './core'
import {Cell} from './types'
const data: Cell[] = []
const data2: Cell[] = []
for (let i = 0; i < 100; i++) {
  for (let j = 0; j < 100; j++) {
    const cell: Cell = {
      x: i,
      y: j,
      v: '单元格'
    }
    data.push(cell)
  }
}
for (let i = 0; i < 100; i++) {
  for (let j = 0; j < 5; j++) {
    const cell: Cell = {
      x: i,
      y: j,
      v: '单元格'
    }
    data2.push(cell)
  }
}
const loveyyaoExcel: any = new LoveyyaoExcel({
  container: document.getElementById('container') as HTMLElement,
  showLeftIndex: true,
  showTopLetter: true,
  sheets: [{ data }, { data: data2 }]
})
console.log(loveyyaoExcel)

// setTimeout(() => {
//   loveyyaoExcel.changeSheet('sheet2')
// }, 1500)
