import React from 'react'
import './contactInfo.sass'
import { useForm } from 'react-hook-form';
import PhoneInput from 'react-phone-input-2';

export default function ContactInfo() {
  const {
    register,
    formState: { errors },
  } = useForm({
    mode: 'onBlur',
  });
  return (
    <>
      <div className='info-container'>
        <h3 className='info-title'>Контактні дані</h3>
        <div className="info-input-wrap">
          <div>
            <label className='label-title' htmlFor="name">Ім'я</label>
            <input
              {
              ...register('name', {
                required: 'Поле є обов\'язковим',
                minLength: {
                  value: 2,
                  message: 'Мінімум 2 символи'
                },
                maxLength: {
                  value: 30,
                  message: 'Максимум 30 символів'
                }
              })
              }
              className='surname'
              type="text"
              name='name'
            />
            <div className='error-container'>
              {errors?.name && <p className='error-message'>{errors?.name?.message}</p>}
            </div>
          </div>
          <div>
            <div className='phone-container'>
              <label className='label-title' htmlFor="phone">Номер телефону</label>
              <PhoneInput
                specialLabel=""
                className='phone'
                type="tel"
                name='phone'
                country={'ua'}
              />
              <div className='error-container'>
                {errors?.phone && <p className='error-message'>{errors?.phone?.message}</p>}
              </div>
            </div>
          </div>
        </div>
        <div className="comments-wrap">
          <div className='name-container'>
            <label className='label-title' htmlFor="surname">Прізвище</label>
            <input
              {
              ...register('surname', {
                required: 'Поле є обов\'язковим',
                minLength: {
                  value: 2,
                  message: 'Мінімум 2 символи'
                },
                maxLength: {
                  value: 30,
                  message: 'Максимум 30 символів'
                }
              })
              }
              className='surname'
              type="text"
              name='surname'
            />
            <div className='error-container'>
              {errors?.surname && <p className='error-message'>{errors?.surname?.message}</p>}
            </div>
          </div>
        </div>
      </div>
    </>
  )
}
