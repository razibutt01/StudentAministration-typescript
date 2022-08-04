import React from "react";
type Sideprops = {
  getfilter(e: string): void;
};

const Side: React.FunctionComponent<Sideprops> = ({ getfilter }) => {
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    console.log(e.target.value);
    getfilter(e.target.value);
  };

  return (
    <div className="side">
      <label>
        <input
          type="checkbox"
          name="filter"
          value="Chemistry"
          className="form-control-checkbox"
          onChange={(e) => handleChange(e)}
        />
        Chemistry
      </label>
      <label>
        <input
          type="checkbox"
          name="filter"
          value="Physics"
          className="form-control-checkbox"
          onChange={handleChange}
        />
        Physics
      </label>
      <label>
        <input
          type="checkbox"
          name="filter"
          value="Maths"
          className="form-control-checkbox"
          onChange={handleChange}
        />
        Maths
      </label>
      <label>
        <input
          type="checkbox"
          name="filter"
          value="Computer"
          className="form-control-checkbox"
          onChange={handleChange}
        />
        Computer
      </label>

      <label>
        <input
          type="checkbox"
          name="filter"
          value="Biology"
          className="form-control-checkbox"
          onChange={handleChange}
        />
        Biology
      </label>
    </div>
  );
};

export default Side;
