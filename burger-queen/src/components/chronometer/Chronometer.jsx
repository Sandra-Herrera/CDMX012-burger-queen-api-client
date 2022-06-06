import React, { useEffect, useState } from "react";
import styles from "./chronometer.module.css";
import PropTypes from "prop-types";

const Chronometer = (props) => {
  const [diff, setDiff] = useState(null);
  const [initial, setInitial] = useState(null);
  const { setTimer} = props;

  const tick = () => {
    setDiff(new Date(+new Date() - initial));
  };

  const start = () => {
    setInitial(+new Date());
  };

  const stop = () => {
    setTimer(timeFormat(diff));
    setInitial(timeFormat());
  };

  useEffect(() => {
    if (initial) {
      requestAnimationFrame(tick);
    }
  }, [initial]);

  useEffect(() => {
    if (diff) {
      requestAnimationFrame(tick);
    }
  }, [diff]);

  return (
    <>
      <section className={styles.chronometer}>
        <div className={styles.App} onClick={start}>
          <h1 className={styles.timer}>{timeFormat(diff)}</h1>
        </div>
        <button className={styles.stop} onClick={stop}>
          Stop
        </button>
      </section>
    </>
  );
};

const timeFormat = (date) => {
  if (!date) return "00:00:00";

  let mm = date.getUTCMinutes();
  let ss = date.getSeconds();
  let cm = Math.round(date.getMilliseconds() / 10);

  mm = mm < 10 ? "0" + mm : mm;
  ss = ss < 10 ? "0" + ss : ss;
  cm = cm < 10 ? "0" + cm : cm;

  return `${mm}:${ss}:${cm}`;
};

export default Chronometer;

Chronometer.propTypes = {
  setTimer: PropTypes.func,
  setStop: PropTypes.func,
};
