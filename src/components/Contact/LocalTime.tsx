import React, { useEffect, useState } from "react";

const getCurrentTime = () => {
  const date = new Date().toLocaleTimeString("en-IN", { hourCycle: "h12" });
  return date.toUpperCase();
};

const LocalTime = () => {
  const [time, setTime] = useState(getCurrentTime());

  useEffect(() => {
    const interval = setInterval(() => {
      console.log(getCurrentTime());
      setTime(getCurrentTime());
    }, 1000);

    return () => {
      clearInterval(interval);
    };
  }, []);

  return (
    <div className="flex min-w-fit gap-8 text-nowrap justify-between w-2/3 bg-card py-3 px-5 rounded-lg border border-border">
      <div className="space-x-3">
        <span className="size-2 bg-white rounded-full inline-block"></span>
        <span className="align-middle ">Local Time</span>
      </div>

      <div className="align-middle">{time}</div>
    </div>
  );
};

export default LocalTime;
