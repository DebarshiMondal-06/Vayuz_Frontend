/* eslint-disable array-callback-return */
import moment from "moment";


export const calculate = (role, numbers, filterOrders) => {
  if (role === 'sales') {
    return numbers.reduce((accumulator, currentValue) => accumulator + currentValue.filled_cylinders, 0);
  }
  else if (role === 'paid_reveune') {
    var paid = 0;
    filterOrders.filter((el) => {
      if (el.payment_status === 'Paid') {
        paid = paid + el.amount;
      }
    })
    return paid;
  }
  else if (role === 'credit_reveune') {
    var credit = 0;
    filterOrders.filter((el) => {
      if (el.payment_status === 'Credit') {
        credit = credit + el.amount;
      }
    })
    return credit;
  }
  else if (role === 'order_delivered') {
    var deliver = 0;
    filterOrders.filter((el) => {
      if (el.status === 'Delivered') {
        deliver = deliver + 1;
      }
    })
    return deliver;
  }
  else if (role === 'delivered_today') {
    var deliver_today = 0;
    filterOrders.filter((el) => {
      if (moment(el.delivery_date).isSame(moment(), 'days') && el.status === 'Delivered') {
        console.log(el);
        deliver_today = deliver_today + 1;
      }
    })
    return deliver_today;
  }
  else if (role === 'today_paid_reveune') {
    var paid_today = 0;
    filterOrders.filter((el) => {
      if (el.payment_status === 'Paid' && moment(el.payment_date).isSame(moment(), 'days')) {
        paid_today = paid_today + el.amount;
      }
    })
    return paid_today;
  }
  else if (role === 'total_discount') {
    var total_discount = 0;
    filterOrders.filter((el) => {
      if (el.discount) {
        total_discount = total_discount + el.discount;
      }
    })
    return total_discount;
  }
  else {
    return numbers.length
  }
}
