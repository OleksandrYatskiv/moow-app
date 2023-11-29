import React, { useState, useEffect } from 'react';
import PlacesAutocomplete, {
  geocodeByAddress,
  getLatLng,
} from 'react-places-autocomplete';
import './RouteSectionStyles.sass';
import { useForm } from 'react-hook-form';
import { useDispatch } from 'react-redux';
import { setDistance, setPointA } from '../../store/slice';

const RouteSection = () => {

  const dispatch = useDispatch();

  const {
    register,
    formState: { errors },
  } = useForm({
    mode: 'onBlur',
  });

  const [points, setPoints] = useState([
    { title: 'A', date: '', address: '', workTime: '', arrivalTime: '', coordinates: null },
    { title: 'B', address: '', workTime: '', coordinates: null },
  ]);

  const addPoint = () => {
    const newPoint = { title: String.fromCharCode(65 + points.length), address: '', workTime: '', coordinates: null };
    setPoints([...points, newPoint]);
  };

  const handlePointChange = async (index, field, value) => {
    const updatedPoints = [...points];
    updatedPoints[index][field] = value;
    setPoints(updatedPoints);
  };

  const handleSelect = async (value, index) => {
    const results = await geocodeByAddress(value);
    const ll = await getLatLng(results[0]);

    const updatedPoints = [...points];
    updatedPoints[index].address = value;
    updatedPoints[index].coordinates = ll;
    setPoints(updatedPoints);
    dispatch(setPointA(points[0].coordinates));
  };

  const calculateDistance = (coord1, coord2) => {
    const R = 6371; // Radius of the Earth in kilometers
    const dLat = (coord2.lat - coord1.lat) * (Math.PI / 180);
    const dLon = (coord2.lng - coord1.lng) * (Math.PI / 180);
    const a =
      Math.sin(dLat / 2) * Math.sin(dLat / 2) +
      Math.cos(coord1.lat * (Math.PI / 180)) * Math.cos(coord2.lat * (Math.PI / 180)) * Math.sin(dLon / 2) * Math.sin(dLon / 2);
    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
    const distance = R * c;

    return distance;
  };

  useEffect(() => {
    if (points[0].coordinates && points[1].coordinates) {
      const distance = calculateDistance(points[0].coordinates, points[1].coordinates);
      dispatch(setDistance(distance));
    }
  }, [points]);

  return (
    <>
      <form action="">
        <div className='route-section'>
          <h3 className='route-title'>Маршрут</h3>
          {points.map((point, index) => (
            <div className="point-card" key={index}>
              <h3>Точка {point.title}</h3>
              <div className="container">
                {index === 0 && (
                  <>
                    <div className='input-container'>
                      <label>Дата:</label>
                      <input
                        {
                        ...register('date', {
                          required: 'Поле є обов\'язковим',
                        })
                        }
                        type="date"
                        value={point.date}
                        onChange={(e) => handlePointChange(index, 'date', e.target.value)}
                      />
                      <div className='error-container'>
                        {errors?.date && <p className='error-message'>{errors?.date?.message}</p>}
                      </div>
                    </div>
                  </>
                )}
                <div className='input-container'>
                  <label>Адреса:</label>
                  <PlacesAutocomplete
                    value={point.address}
                    onChange={(value) => handlePointChange(index, 'address', value)}
                    onSelect={(value) => handleSelect(value, index)}
                  >
                    {({ getInputProps, suggestions, getSuggestionItemProps, loading }) => (
                      <>
                        <input
                          {...getInputProps({
                            placeholder: 'Введіть адресу ...',
                            className: 'location-search-input',
                          })}
                        />
                        <div className='error-container'>
                          {errors?.address && <p className="error-message">{errors?.address?.message}</p>}
                        </div>
                        <div className="autocomplete-dropdown-container">
                          {loading && <div>Loading...</div>}
                          {suggestions.map((suggestion, suggestionIndex) => {
                            const className = suggestion.active
                              ? 'suggestion-item--active'
                              : 'suggestion-item';
                            const style = suggestion.active
                              ? { backgroundColor: '#fafafa', cursor: 'pointer' }
                              : { backgroundColor: '#ffffff', cursor: 'pointer' };
                            return (
                              <div
                                key={suggestionIndex}
                                {...getSuggestionItemProps(suggestion, {
                                  className,
                                  style,
                                })}
                              >
                                <span>{suggestion.description}</span>
                              </div>
                            );
                          })}
                        </div>
                      </>
                    )}
                  </PlacesAutocomplete>
                </div>
                <div className='input-container'>
                  <label>Час роботи (год)</label>
                  <input
                    {
                    ...register(`workTime${point.title}`, {
                      required: 'Поле є обов\'язковим',
                    })
                    }
                    type="number"
                    value={point.workTime}
                    onChange={(e) => handlePointChange(index, 'workTime', e.target.value)}
                  />
                  <div className='error-container'>
                    {errors?.[`workTime${point.title}`] && <p className='error-message'>{errors?.[`workTime${point.title}`]?.message}</p>}
                  </div>
                </div>
                {index === 0 && (
                  <>
                    <div className='input-container'>
                      <label>Час прибуття:</label>
                      <input
                        {
                        ...register('arrivalTime', {
                          required: 'Поле є обов\'язковим',
                        })
                        }
                        type="time"
                        value={point.arrivalTime}
                        onChange={(e) => handlePointChange(index, 'arrivalTime', e.target.value)}
                      />
                      <div className='error-container'>
                        {errors?.arrivalTime && <p className='error-message'>{errors?.arrivalTime?.message}</p>}
                      </div>
                    </div>
                  </>
                )}
              </div>
            </div>
          ))}
          <button
            className='add-point-btn'
            onClick={(e) => {
              e.preventDefault();
              addPoint();
            }}
          >
            Додати ще одну точку
          </button>
        </div>
      </form>
    </>
  );
};

export default RouteSection;
