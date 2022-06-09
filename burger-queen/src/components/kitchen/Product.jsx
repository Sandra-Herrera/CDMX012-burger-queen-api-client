import React, { useState } from "react";
import PropTypes from "prop-types";
import styles from "./kitchen.module.css";

const Product = (props) => {
  const { chosenProd, index, handleChange, check, setSaveTime } = props;
  const [time, setTime] = useState({ ms: 0, s: 0, m: 0, h: 0 });
  const [interv, setInterv] = useState();
  const [status, setStatus] = useState(0);
  //   const [saveTime, setSaveTime] = useState();
  // Not started = 0
  // started = 1
  // stopped = 2

  const start = () => {
    run();
    setStatus(1);
    setInterv(setInterval(run, 10));
  };

  var updatedMs = time.ms,
    updatedS = time.s,
    updatedM = time.m,
    updatedH = time.h;

  const run = () => {
    if (updatedM === 60) {
      updatedH++;
      updatedM = 0;
    }
    if (updatedS === 60) {
      updatedM++;
      updatedS = 0;
    }
    if (updatedMs === 100) {
      updatedS++;
      updatedMs = 0;
    }
    updatedMs++;
    return setTime({ ms: updatedMs, s: updatedS, m: updatedM, h: updatedH });
  };

  const stop = () => {
    clearInterval(interv);
    setStatus(2);
    setSaveTime(time);
  };
  //   console.log(typeof saveTime)

  const h = () => {
    if (time.h === 0) {
      return "";
    } else {
      return <span>{time.h >= 10 ? time.h : "0" + time.h}</span>;
    }
  };

  return (
    <div key={chosenProd.id} className={styles.containerItems}>
      <div className={styles.itemAlignStart}>{chosenProd.product}</div>
      <div className={styles.itemTable}>{chosenProd.qty}</div>
      <div className={styles.itemTable}>{chosenProd.table}</div>
      <div className={styles.itemTable}>
        <div className={styles.timeAndStop}>
          {status != 0 && (
            <div className={styles.time}>
              {h()}&nbsp;&nbsp;
              <span>{time.m >= 10 ? time.m : "0" + time.m}</span>&nbsp;:&nbsp;
              <span>{time.s >= 10 ? time.s : "0" + time.s}</span>&nbsp;:&nbsp;
              <span>{time.ms >= 10 ? time.ms : "0" + time.ms}</span>
            </div>
          )}
        </div>
        {status === 0 ? (
          <button className={styles.chronometer} onClick={start}>
            Start
          </button>
        ) : (
          ""
        )}
        {status === 1 ? (
          <div>
            <button className={styles.stopwatch} onClick={stop}>
              Stop
            </button>
          </div>
        ) : (
          ""
        )}
      </div>
      <div className={styles.itemTable}>
        <input
          type="checkbox"
          value="check"
        //   onChange={() => handleChange(index, chosenProd, stop())}
          onChange={handleChange(index, chosenProd)}
          checked={check[index]}
          className={styles.checkbox}
          disabled={check[index]}
        />
      </div>
    </div>
  );
};

export default Product;

Product.propTypes = {
  chosenProd: PropTypes.object,
  index: PropTypes.number,
  handleChange: PropTypes.func,
  check: PropTypes.array,
  setSaveTime: PropTypes.func,
};
