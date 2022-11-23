import React from 'react';
import './styles/tableHeader.scss';
import dayjs from 'dayjs';
import { getDate } from '../../utils/getDate';

export function TableHeader ({result, weeksArray}: any) {
  let month = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec']

  return(
    <thead className='thead'>
      <tr className='tableHeaderRow'>
        <th rowSpan={2} className='taskList headcol'>Work item</th>
        { //@ts-ignore next line
          weeksArray.map(week => {
            let firstDayOfWeek = new Date(week[0])
            let firstMonth = month[firstDayOfWeek.getMonth()]
            let lastDayOfWeek = new Date(week[week.length-1])
            let lastMonth = month[lastDayOfWeek.getMonth()]
            
          return <th className='weeks-th' colSpan={week.length}>{firstDayOfWeek.getDate()} {firstMonth} - {lastDayOfWeek.getDate()} {lastMonth}</th>
          })
        }
      </tr>
      <tr>
        {//@ts-ignore next line
        result.map(date => {
          let relevantDate = dayjs(date, 'YYYY-MM-DD').date()
          return <th className='days-th' key={date}>{relevantDate}</th>
          })
        }
      </tr>
    </thead>
  )
}