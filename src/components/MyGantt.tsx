import React from 'react';
import { Download } from '../icons/download';
import './table/styles/gantt.scss';
import { Table } from './table/Table';

export function MyGantt ({data}: {data: any}) {

  //заголовок
  const titleProject = data.project;
  const dataPeriod = data.period

  return(
    <div className='gantt-wrapper'>
      <div className='header'>
        <h1>{titleProject} / {dataPeriod}</h1>
        <button className='exportButton'><Download /> Export</button>
      </div>
      <div className='gantt-content-wrapper'>
        <Table data={data}/>
      </div>
    </div>
  )
}
