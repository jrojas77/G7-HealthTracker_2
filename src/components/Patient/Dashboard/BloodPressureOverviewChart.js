import React from "react";
import { Button, IconButton, Stack, Tooltip, Typography } from "@mui/material";
import Chart from "react-apexcharts";
import DashboardCard from "./DashboardCard";
import useWeeklyDate from "../../../hooks/WeeklyDateHook";
import {
  getMonthScope,
  mapDatesToWeeklyLabel,
} from "../../../helpers/date-helper";
import {
  getHighestDiastolicBloodPressureByDate,
  getHighestSystolicBloodPressureByDate,
} from "../../../helpers/chart-helper";
import { IconChevronLeft, IconChevronRight } from "@tabler/icons-react";

const OPTIONS_CHART = {
  chart: {
    type: "bar",
    fontFamily: "'Plus Jakarta Sans', sans-serif;",
    foreColor: "#adb0bb",
    toolbar: {
      show: true,
    },
    height: 370,
  },
  colors: ["#7599FF", "#8EF2FF"],
  plotOptions: {
    bar: {
      horizontal: false,
      barHeight: "60%",
      columnWidth: "42%",
      borderRadius: [6],
      borderRadiusApplication: "end",
      borderRadiusWhenStacked: "all",
    },
  },

  stroke: {
    show: true,
    width: 5,
    lineCap: "butt",
    colors: ["transparent"],
  },
  dataLabels: {
    enabled: false,
  },
  legend: {
    position: "top",
    floating: true,
    offsetX: 20,
    itemMargin: {
      horizontal: 5,
      vertical: 0,
    },
  },
  grid: {
    borderColor: "rgba(0,0,0,0.1)",
    strokeDashArray: 3,
    xaxis: {
      lines: {
        show: false,
      },
    },
  },
  yaxis: {
    tickAmount: 4,
  },
  xaxis: {
    categories: [],
    axisBorder: {
      show: false,
    },
  },
  tooltip: {
    theme: "light",
    fillSeriesColor: false,
  },
};

const BloodPressureOverviewChart = ({ vitalSignsInformation = []}) => {
  const { weekDates, nextWeek, prevWeek, isInitialState, reset } =
    useWeeklyDate();
  const monthScope = getMonthScope(weekDates);

  const categories = mapDatesToWeeklyLabel(weekDates);

  const highestDiastolicBloodPressureByDate =
    getHighestDiastolicBloodPressureByDate(vitalSignsInformation);
  const highestSystolicBloodPressureByDate =
    getHighestSystolicBloodPressureByDate(vitalSignsInformation);

  const highestDiastolicBloodPressureData = [];
  const highestSystolicBloodPressureData = [];

  for (let i = 0; i < weekDates.length; i++) {
    const day = weekDates[i];
    highestDiastolicBloodPressureData[i] =
      highestDiastolicBloodPressureByDate[day] || 0;
    highestSystolicBloodPressureData[i] =
      highestSystolicBloodPressureByDate[day] || 0;
  }

  const optionscolumnchart = { ...OPTIONS_CHART, xaxis: { categories } };
  const seriescolumnchart = [
    {
      name: "Highest Diastolic Blood Pressure",
      data: highestDiastolicBloodPressureData,
    },
    {
      name: "Highest Systolic Blood Pressure",
      data: highestSystolicBloodPressureData,
    },
  ];

  return (
    <DashboardCard
      title="Blood Pressure Overview"
      action={
        <Stack direction="row" spacing={1} my={1} alignItems="center">
          {!isInitialState && <Button onClick={reset}>Reset</Button>}
          <Tooltip title="Previous Week">
            <IconButton onClick={prevWeek}>
              <IconChevronLeft width="20" height="20" />
            </IconButton>
          </Tooltip>
          <Tooltip title="Next Week">
            <IconButton onClick={nextWeek}>
              <IconChevronRight width="20" height="20" />
            </IconButton>
          </Tooltip>
          <Typography variant="h6">{monthScope}</Typography>
        </Stack>
      }
    >
      <Chart
        options={optionscolumnchart}
        series={seriescolumnchart}
        type="bar"
        height="370px"
      />
    </DashboardCard>
  );
};

export default BloodPressureOverviewChart;
