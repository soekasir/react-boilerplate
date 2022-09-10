/* eslint-disable camelcase */
// import Cookies from 'js-cookie';
export const monthsEn = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];
export const shortMonthsEn = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
export const daysEn =['Sunday','Monday','Tuesday','Wednesday','Thursday','Friday','Saturday'];
export const shortDaysEn =['Sun','Mon','Tue','Wed','Thu','Fri','Sat'];
export const formatToFullDatetime = (date:Date) => {
  let newDate = (date);
  // const monthsId = ['Januari', 'Februari', 'Maret', 'April', 'Mei', 'Juni', 'Juli', 'Agustus', 'September', 'Oktober', 'Nopember', 'Desember'];
  newDate = typeof newDate === 'string' ? new Date(newDate) : newDate;
  const at = 'at';
  return `${newDate.getDate()} ${monthsEn[newDate.getMonth()]} ${newDate.getFullYear()} ${at} ${(`0${newDate.getHours()}`).slice(-2)}:${(`0${newDate.getMinutes()}`).slice(-2)}`;
};

/**
 * @param month bulan yg dicari jumlah harinya, 1 = january, 2 = february. index start from 1
 * @param year tahunnya, default tahun skrg
 */
 export const maxDateOfMonth = (month:number, year: number = new Date().getFullYear() ) =>{
  //menggunakan 0 as day it will memberi last day dari bulan sebelumnya.
  //let's say the month starts with index 1, because javascript default bulannya di index mulai dr 0, 0=january, 1 = februari
  return new Date(year, month, 0).getDate();
}

/**
 * Digunakan to search perbedaan 2 tanggal
 *
 * Kalau digunakan untuk countdown, `date1` ke tgl skrg, `date2` ke tanggal berakhirnya countdown
 * @param {Date|number|string} date1 date yg sekiranya lebih kecil
 * @param {Date|number|string} date2 date yg sekiranya lebih besar
 * @param without {'minute'|'hour'|'day'|'month'|'year'} default without month;
 */
export const difDate = (date1:Date|number|string, date2:Date|number|string, without:'minute'|'hour'|'day'|'month'|'year' = 'month') => {
  const date_1 = new Date(date1).getTime();
  const date_2 = new Date(date2).getTime();
  const diff = (date_2 - date_1) / 1000; // dirubah ke second
  let day = 0; let hour = 0; let minute = 0; let second = 0;
  let month = 0; let year = 0;
  second = Math.floor(diff);
  if (without === 'minute') {
    return {
      second,
    };
  }
  second %= 60;
  minute = Math.floor((diff - second) / 60);
  if (without === 'hour') {
    return {
      second, minute,
    };
  }
  minute %= 60;
  hour = Math.floor(((diff - (second + minute * 60)) / (60 * 60)));
  if (without === 'day') {
    return {
      second, minute, hour,
    };
  }
  hour %= 60;
  day = Math.floor(
    ((diff - (second + minute * 60 + hour * 60 * 60)) / (60 * 60 * 24))
  );
  if (without === 'month') {
    return {
      second, minute, hour, day
    };
  }
  // anggap saja semua bulan itu 30 hari
  day %= 30;

  month = Math.floor(
    ((diff - (second + minute * 60 + hour * 60 * 60 + day * 60 * 60 * 24)) / (60 * 60 * 24 * 30))
  );
  if (without === 'year') {
    return {
      second, minute, hour, day, month
    };
  }
  month %= 12;
  year = Math.floor(
    ((diff - (second + minute * 60 + hour * 60 * 60 + day * 60 * 60 * 24 * 30))
    / (60 * 60 * 24 * 30 * 12))
  );
  return {
    second, minute, hour, day, month, year
  };
};