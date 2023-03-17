import React from "react";

function CalendarDay({ day, budget, dayTotal }) {
    const percentUsed = Math.round((dayTotal / budget) * 100);
    return (
      <div className="calendar-day">
        <div className="calendar-day-label">{day}</div>
        <div className="calendar-day-progress">
          <div
            className={`progress-bar ${percentUsed > 100 ? 'over-budget' : ''}`}
            style={{ width: `${Math.min(percentUsed, 100)}%` }}
          />
        </div>
      </div>
    );
  }
  

  export default CalendarDay;