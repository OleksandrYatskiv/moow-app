import React from 'react'
import './Payment.sass'

export default function Payment() {
  return (
    <div className='payment-container'>
      <h3 className='payment-title'>Оплата</h3>

      <div className="payment-input-wrapp">
        <div className="radio-wrapp">
          <input className='payment-input' type="radio" name="paymentInput" id="" />
          <p className='payment-text'>Готівка перед завантаженням</p>
        </div>
        <div className="radio-wrapp">
          <input className='payment-input' type="radio" name="paymentInput" id="" />
          <p className='payment-text'>Готівка перед розвантаженням</p>
        </div>
        <div className="radio-wrapp">
          <input className='payment-input' type="radio" name="paymentInput" id="" />
          <p className='payment-text'>Безпечна угода через MOOW</p>
          <p className='payment-choise'>Visa/MasterCard</p> 
        </div>
      </div>
    </div>
  )
}
