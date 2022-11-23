//функция для получения даты
export function getDate(string: string) {
  let startDate = string.split('.')
  let month = startDate[1]
  startDate.unshift(month)
  startDate.splice(2, 1)
  let finallyStartDate = new Date(startDate.join('.'))
  return finallyStartDate
}

//функция для получения периода
export function getPeriodDate(startDate: any, endData: any) {
  let result = [] 
  function pad(s: string | number){ return ('00' + s).slice(-2)}

  while(startDate.getTime() <= endData.getTime()) {
    result.push( '' + startDate.getFullYear() +'-'+ pad(startDate.getMonth() +1) +'-'+ pad(startDate.getDate()));
    startDate.setDate(startDate.getDate() + 1);
  }
  return result
}

