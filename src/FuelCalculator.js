import React, { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faAngleDown, faAngleUp } from '@fortawesome/free-solid-svg-icons';
import './FuelCalculator.css';

function FuelCalculator() {
  const [distanceKm, setDistanceKm] = useState('');
  const [cityMileage, setCityMileage] = useState('');
  const [highwayMileage, setHighwayMileage] = useState('');
  const [fuelPrice, setFuelPrice] = useState('');
  const [selectedCurrency, setSelectedCurrency] = useState('INR');
  const [roundTrip, setRoundTrip] = useState(false);
  const [showAdvancedOptions, setShowAdvancedOptions] = useState(false);
  const [totalCost, setTotalCost] = useState(null);

  const calculateCost = () => {
    const distanceKmValue = parseFloat(distanceKm);
    const fuelPriceValue = parseFloat(fuelPrice);
    const cityMileageValue = parseFloat(cityMileage);
    const highwayMileageValue = parseFloat(highwayMileage);

    if (distanceKmValue > 0 && fuelPriceValue > 0) {
      let totalDistance = distanceKmValue;
      if (roundTrip) {
        totalDistance *= 2; // Double the distance for round trip
      }
      
      const mileageKmpl = showAdvancedOptions ? (cityMileageValue + highwayMileageValue) / 2 : parseFloat(cityMileage);
      const fuelConsumedLiters = totalDistance / mileageKmpl;
      const totalCostValue = fuelConsumedLiters * fuelPriceValue;
      
      setTotalCost(totalCostValue.toFixed(2));
    } else {
      setTotalCost(null);
    }
  };

  const handleCurrencyChange = (e) => {
    setSelectedCurrency(e.target.value);
  };

  return (
    <div className="fuel-calculator">
      <h1 className="title">Trip Fuel Cost Calculator</h1>
      <div className="input-container">
        <label>Distance (km): </label>
        <input
          type="number"
          value={distanceKm}
          onChange={(e) => setDistanceKm(e.target.value)}
        />
      </div>
      {!showAdvancedOptions && (
        <div className="input-container">
          <label>Mileage (km per liter): </label>
          <input
            type="number"
            value={cityMileage}
            onChange={(e) => setCityMileage(e.target.value)}
          />
        </div>
      )}
      <div className="input-container">
        <label>Fuel Price: </label>
        <div className="fuel-price-input">
          <input
            type="number"
            value={fuelPrice}
            onChange={(e) => setFuelPrice(e.target.value)}
          />
          <select className="currency-dropdown" value={selectedCurrency} onChange={handleCurrencyChange}>
            <option value="INR">INR</option>
            <option value="AED">AED</option>
          </select>
        </div>
      </div>
      <div className="input-container">
        <label>
          Trip Type: 
          <select value={roundTrip} onChange={(e) => setRoundTrip(e.target.value === 'true')}>
            <option value="false">One Way</option>
            <option value="true">Round Trip</option>
          </select>
        </label>
      </div>
      <div className="input-container">
        <label onClick={() => setShowAdvancedOptions(!showAdvancedOptions)}>
          Advanced
          <FontAwesomeIcon icon={showAdvancedOptions ? faAngleUp : faAngleDown} />
        </label>
      </div>
      {showAdvancedOptions && (
        <>
          <div className="input-container">
            <label>City Mileage (km per liter): </label>
            <input
              type="number"
              value={cityMileage}
              onChange={(e) => setCityMileage(e.target.value)}
            />
          </div>
          <div className="input-container">
            <label>Highway Mileage (km per liter): </label>
            <input
              type="number"
              value={highwayMileage}
              onChange={(e) => setHighwayMileage(e.target.value)}
            />
          </div>
        </>
      )}
      <button className="calculate-btn" onClick={calculateCost}>Calculate</button>
      {totalCost !== null && (
        <p className="result">Total Trip Cost ({selectedCurrency}): {selectedCurrency === 'INR' ? '₹' : 'د.إ'}{totalCost}</p>
      )}
      <p className="developer">
        Developed by <a href="https://rineeshch.github.io/" className="glow" target="_blank" rel="noopener noreferrer">Rineesh</a>
      </p>
    </div>
  );
}

export default FuelCalculator;
