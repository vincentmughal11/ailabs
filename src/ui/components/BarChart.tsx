"use client";
/*
 * Documentation:
 * Bar Chart — https://app.subframe.com/c0ba55092608/library?component=Bar+Chart_4d4f30e7-1869-4980-8b96-617df3b37912
 */

import React from "react";
import * as SubframeCore from "@subframe/core";
import * as SubframeUtils from "../utils";

interface BarChartRootProps
  extends React.ComponentProps<typeof SubframeCore.BarChart> {
  stacked?: boolean;
  className?: string;
}

const BarChartRoot = React.forwardRef<
  React.ElementRef<typeof SubframeCore.BarChart>,
  BarChartRootProps
>(function BarChartRoot(
  { stacked = false, className, ...otherProps }: BarChartRootProps,
  ref
) {
  return (
    <SubframeCore.BarChart
      className={SubframeUtils.twClassNames("h-80 w-full", className)}
      ref={ref}
      stacked={stacked}
      colors={[
        "#6366f1",
        "#c7d2fe",
        "#4f46e5",
        "#a5b4fc",
        "#4338ca",
        "#818cf8",
      ]}
      {...otherProps}
    />
  );
});

export const BarChart = BarChartRoot;
