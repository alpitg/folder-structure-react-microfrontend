import "./slider.scss";

import { useState } from "react";

const CustomSliderApp = ({
  min = 0,
  max = 100,
  step = 1,
  initial = 10,
  getValue,
}: {
  min?: number;
  max?: number;
  step?: number;
  initial?: number;
  getValue: (value: number) => void;
}) => {
  const [value, setValue] = useState(initial);

  const handleChange = (e: any) => {
    setValue(Number(e.target.value));
    getValue(Number(e.target.value));
  };

  const percentage = ((value - min) / (max - min)) * 100;

  return (
    <div className="slider-app">
      <div className="slider-container">
        <div className="slider-label">
          <span className="value">{value}</span>
          <span className="percent">%</span>
        </div>
        <input
          type="range"
          className="custom-slider"
          min={min}
          max={max}
          step={step}
          value={value}
          onChange={handleChange}
          style={{
            background: `linear-gradient(90deg, var(--bs-blue) ${percentage}%, #ccc ${percentage}%)`,
          }}
        />
      </div>
    </div>
  );
};

export default CustomSliderApp;
