import React from 'react'
import './cargo.sass'
import { useForm } from 'react-hook-form';
import { useDispatch, useSelector } from 'react-redux';
import { setForwarder } from '../../store/slice';

export default function Cargo() {
  const {
    register,
    formState: { errors },
  } = useForm({
    mode: 'onBlur',
  });

  const dispatch = useDispatch();
  const forwarder = useSelector((state) => state.slice.forwarder);

  const handleForwarderState = () => {
    dispatch(setForwarder(!forwarder));
  }

  return (
    <>
      <div className='cargo-container'>
        <h3 className='cargo-title'>Про вантаж</h3>
        <div className="cargo-input-wrap">
          <div>
            <label className='label-title' htmlFor="cargoWeight">Вага вантажу (кг)</label>
            <input
              {
              ...register('cargoWeight', {
                required: 'Поле є обов\'язковим',
              })
              }
              className='cargo-weight'
              type="number"
              name='cargoWeight'
            />
            <div className='error-container'>
              {errors?.cargoWeight && <p className='error-message'>{errors?.cargoWeight?.message}</p>}
            </div>
          </div>
          <div >
            <div className='params-container'>
              <label className='label-title' htmlFor="cargoParams">Габарит вантажу ДШВ (м)</label>
              <div className='cargo-params-wrap'>
                <input
                  {
                  ...register('cargoParams', {
                    required: 'Поле є обов\'язковим',
                  })
                  }
                  className='cargo-params'
                  type="number"
                  name='cargoParams'
                />

                <span>X</span>
                <input
                  {
                  ...register('cargoParams', {
                    required: 'Поле є обов\'язковим',
                  })
                  }
                  className='cargo-params'
                  type="number"
                />
                <span>X</span>
                <input
                  {
                  ...register('cargoParams', {
                    required: 'Поле є обов\'язковим',
                  })
                  }
                  className='cargo-params'
                  type="number"
                />
              </div>
              <div className='error-container'>
                {errors?.cargoParams && <p className='error-message'>{errors?.cargoParams?.message}</p>}
              </div>
            </div>
          </div>
        </div>
        <div className="comments-wrap">
          <label className='label-title' htmlFor="comments">Коментар</label>
          <textarea
            {
            ...register('comments', {
              required: 'Поле є обов\'язковим',
              minLength: {
                value: 5,
                message: 'Мінімум 5 символів'
              },
              maxLength: {
                value: 4000,
                message: 'Максимум 4000 символів'
              }
            })
            }
            placeholder='Укажіть інформацію про груз, що перевозите ...'
            className='comments'
            maxLength={4000}
            name="comments">
          </textarea>
          <div className='error-container'>
            {errors?.comments && <p className='error-message'>{errors?.comments?.message}</p>}
          </div>
        </div>
      </div>
      <div className="forwarder-container">
        <input onClick={handleForwarderState} className='forwarder-checkbox' type="checkbox" name="forwarder" id="forwarder" />
        <label htmlFor="forwarder">Послуга експедитора</label>
      </div>
    </>
  )
}
 