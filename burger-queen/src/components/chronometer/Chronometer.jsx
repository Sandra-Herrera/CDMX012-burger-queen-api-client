import React, { useState } from "react";
import PropTypes from "prop-types";
import styles from "./chronometer.module.css";
import { useEffect } from "react";

function Chronometer(props) {
  const [time, setTime] = useState({ ms: 0, s: 0, m: 0, h: 0 });
  const [interv, setInterv] = useState();
  const [status, setStatus] = useState(0);
  const { isStopped, saveDate, chosenProd } = props;

  useEffect(() => {
    if (!isStopped) {
      start();
    } else {
      setTime(props.timeFromChosenProd);
    }
  }, []);

  useEffect(() => {
    stop();
    if (isStopped && !chosenProd.dateDone) {
      saveDate({ ...chosenProd, time: time });
    }
  }, [isStopped]);

  const start = () => {
    run();
    setStatus(1);
    setInterv(setInterval(run, 10));
  };

  const formatZero = (t) => (t < 10 ? "0" : "") + t;
  const run = () => {
    let dCreate = new Date(chosenProd.dateCreated);
    let dDone = new Date();
    let secs = (dDone - dCreate) / 1000;

    let H = (secs / 3600) | 0;
    let M = parseInt(formatZero(((secs % 3600) / 60) | 0));
    let S = parseInt(formatZero(secs % 60 | 0));
    let MS = parseInt(secs * 1000 - H * 3600 * 1000 - M * 60 * 1000 - S * 1000);
    return setTime({ ms: MS, s: S, m: M, h: H });
  };

  const stop = () => {
    clearInterval(interv);
    setStatus(2);
  };

  const h = () => {
    if (time.h === 0) {
      return "";
    } else {
      return <span>{time.h >= 10 ? time.h : "0" + time.h}</span>;
    }
  };

  return (
    <>
      <div className={styles.timeAndStop}>
        {status != 0 && (
          <div className={styles.time}>
            {h()}&nbsp;:&nbsp;
            <span>{time.m >= 10 ? time.m : "0" + time.m}</span>&nbsp;:&nbsp;
            <span>{time.s >= 10 ? time.s : "0" + time.s}</span>&nbsp;:&nbsp;
            <span>{time.ms >= 10 ? time.ms : "0" + time.ms}</span>
          </div>
        )}
         </div>
        {/* {status === 1 ? (
          <div>
            <button className={styles.stopwatch} onClick={stop}>
              Stop
            </button>
          </div>
        ) : (
          ""
        )}
      </div>
      {status === 0 ? (
        <button className={styles.chronometer} onClick={start}>
          Start
        </button>
      ) : (
        ""
      )} */}
    </>
  );
}

export default Chronometer;

Chronometer.propTypes = {
  setSaveTime: PropTypes.func,
  isStopped: PropTypes.bool,
  timeFromChosenProd: PropTypes.object,
  saveDate: PropTypes.func,
  chosenProd: PropTypes.object,
};
