import React from 'react';
import { LavelFive } from '../../icons/lavelFive';
import { LavelFour } from '../../icons/lavelFour';
import { LavelOne } from '../../icons/lavelOne';
import { LavelThree } from '../../icons/lavelThree';
import { LavelTwo } from '../../icons/lavelTwo';
import { getPeriodDate } from '../../utils/getDate';
import { getContentRow, getEmptyRow } from '../../utils/getTable';
import './styles/tableBody.scss';

interface Task {
  id: number,
  title: string,
  period_start: string,
  period_end: string,
  fullPeriod: string [],
  subtasks: [],
  child: number,
  lavel: number,
  parent: number | string,
  background: string,
  border: string,
  icon: any,
  display: boolean | string,
}

export function TableBody ({chart, result}: any) {
  let obj = [chart]
  let array: any[] = [];
  let parent = 0; 
  let lavel = 0

  //создаем массив с объектами задач
  function GetTasks(obj: any, parent: number | string, lavel: number) {
    for(let i = 0; i < obj.length; i++) {
      let task: Task = {
        id: 0,
        title: '',
        period_start: '',
        period_end: '',
        fullPeriod: [],
        subtasks: [],
        child: 0,
        lavel: 1,
        parent: '',
        background: '',
        border: '',
        icon: null,
        display: '',
      }
      task.id = obj[i].id;
      task.title = obj[i].title;
      task.period_start = obj[i].period_start;
      task.period_end = obj[i].period_end;
      //записываем в объект задачи период ее выполнения
      task.fullPeriod = task.period_start !== task.period_end ? getPeriodDate(new Date(task.period_start), new Date(task.period_end)) : [task.period_start]

      //если у таски есть child то помещаем их длину в объект таски
      if(obj[i].hasOwnProperty('sub')) {
        task.child = obj[i].sub.length
        task.lavel = lavel + 1
      } else task.lavel = lavel + 1

      //указываем родителя для строки таски
      task.parent = parent 
      if(task.parent === '') return
      
      //стилизуем отображение выполнения таски
      if(task.lavel === 1) {
        task.background = '#E2EBFF'
        task.border = '#497CF6'
      }
      else
      if(task.lavel === 2 || task.lavel === 5) {
        task.background = '#FFF2E0'
        task.border = '#FFA530'
      }
      else
      if(task.lavel === 3 || task.lavel === 4) {
        task.background = '#CFF0D6'
        task.border = '#2DB77B'
      }

      //добавляем иконки уровней
      if(task.lavel === 1) task.icon = <LavelOne />
      if(task.lavel === 2) task.icon = <LavelTwo />
      if(task.lavel === 3) task.icon = <LavelThree />
      if(task.lavel === 4) task.icon = <LavelFour />
      if(task.lavel === 5) task.icon = <LavelFive />

      //пушим таску в массив
      array.push(task)
      if(obj[i].sub) {
        GetTasks(obj[i].sub, task.id, task.lavel)
      }

      //добавляем свойство display
      if(i === 0) {
        task.display = true;
      } else task.display = ''
    }

    //перебираем готовый массив чтобы положить в таску id дочерних строк
    array.map((item) => 
      array.filter((el) => el.parent === item.id ? item.subtasks.push(el.id) : null)
    )
    //очищаем от неуникальных зачений
    for(let i = 0; i < array.length; i++) {
      array[i].subtasks = array[i].subtasks.filter(function(item: any, pos: any) {
        return array[i].subtasks.indexOf(item) == pos;
    })
    }

    //добавляем свойство display
    for(let i = 1; i < array.length; i ++) {
      let itemParent = array.filter((el) => el.id == array[i].parent)
      array[i].display = itemParent[0].display
    }
  }
  GetTasks(obj, parent, lavel)


  //скрываем и раскрываем строки по клику на иконку
  const onHandler = (e: any) => {

    //получаем id строки по которой был клик
    let idRow = e.target.closest('.fullRow').id
    
    function getDisplay(idRow: number) {

      //получаем объект у которого id == id строки по которой был клик
      let item = array.filter((el) => el.id == idRow)
      
      //находим id дочерних элементов объекта
      let childID = item[0].subtasks

      for(let i = 0; i < childID.length; i++) {
        if(document.getElementById(childID[i])?.classList.contains('displayNone') && !document.getElementById(item[0].id)?.classList.contains('displayNone')) {
          document.getElementById(childID[i])?.classList.remove('displayNone')
        } else {
          document.getElementById(childID[i])?.classList.add('displayNone')
        }
        getDisplay(childID[i])
      }
    }
    getDisplay(idRow)
  }

  return(
    <tbody className='tbody'>
      {getEmptyRow(result)}
      {getContentRow(result, array, onHandler)}
      {getEmptyRow(result)}
    </tbody>
  )}