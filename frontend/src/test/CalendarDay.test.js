import CalendarDay from "../components/CalendarDay";
import React from "react";
import { render } from "@testing-library/react";
import '@testing-library/jest-dom/extend-expect';

describe("CalendarDay", () => {
    it("renders day label and progress bar", () => {
      const day = "Monday";
      const budget = 100;
      const dayTotal = 50;
  
      const { getByText, getByRole } = render(
        <CalendarDay day={day} budget={budget} dayTotal={dayTotal} />
      );
  
      const dayLabel = getByText(day);
      expect(dayLabel).toBeInTheDocument();
  
      const progressBar = getByRole("progressbar");
      expect(progressBar).toBeInTheDocument();
    });
  });