import { stringMd5 } from 'react-native-quick-md5';

function formatNumber(number) {
    if (!number && number !== 0) {
      return '';
    }
    return (
      Math.ceil(number)
        .toString()
        .replace(/\B(?=(\d{3})+(?!\d))/g, ',') + ' đ'
    );
  }

  function DataSeach(string) {
    const data=[];
    data.push(string);
    return data

  }


function timeStamp(){
    const today = new Date();
    let date = new Date(Date.UTC(today.getFullYear(), today.getMonth() - 1, today.getDate(), today.getHours(), today.getMinutes(), today.getSeconds()));
    let timeStamp =  date.getTime() / 1000;
    return timeStamp;
}

function createToken({timeStamp}){
  const token = stringMd5("16518b38c0234509b38a34f6ca091e8686" + `${timeStamp}`);
  return token;
}


  const common = {
    formatNumber,
    timeStamp,
    DataSeach,
    createToken,
  };
  
  export default common;