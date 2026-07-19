import "./slider.scss";

type Props = {
  value: number;
  onChange: (value: number) => void;
  min?: number;
  max?: number;
  step?: number;
};

const CustomSliderApp = ({
  value,
  onChange,
  min = 0,
  max = 100,
  step = 1,
}: Props) => {
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
          onChange={(e) => onChange(Number(e.target.value))}
          style={{
            background: `linear-gradient(
              90deg,
              var(--bs-blue) ${percentage}%,
              #ccc ${percentage}%
            )`,
          }}
        />
      </div>
    </div>
  );
};

export default CustomSliderApp;
