import React from 'react';
import './styles/table.scss';
import { TableBody } from './TableBody';
import { TableHeader } from './TableHeader';
import { getDate, getPeriodDate } from '../../utils/getDate';

export function Table ({data}: {data: any}) {
  //разбиваем период на начальную и конечную даты
  let period = data.period.split('-')

  //изменяем начальную дату так чтобы она была первым днем месяца в котором начинаются таски
  period[0] = period[0].split('.')
  period[0].splice(0, 1, '01')
  period[0] = period[0].join('.')

  //получаем начальную и конечную даты
  let startDate = getDate(period[0]);
  let endData = getDate(period[1]);

  //получаем массив дат между начальной и конечной
  let result = getPeriodDate(startDate, endData)
  //получаем даты в формате недель
  function getWeeks(result: any) {
    let arr = []
    for(let i = 0; i < result.length; i++) {
      let newArr = [...result];
      if((i + 1) % 7 === 0) {
        let week = newArr.splice(i - 6, 7);
        arr.push(week)
      }
      //добавляем последнюю неделю
      if(i === result.length - 1) {
        arr.push(newArr.splice((newArr.length - newArr.length % 7), newArr.length % 7))
      }
    }
    return arr
  }
  
  let weeksArray = getWeeks(result)
  const chart = data.chart

  return(
    <table className='table'>
      <TableHeader result={result} weeksArray={weeksArray}/>
      <TableBody chart={chart} result={result}/>
    </table>
  )
}