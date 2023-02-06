import React from "react";
import { Bar } from "react-chartjs-2";
import {
  usePerformanceInfo,
  ClusterStatsStatus,
} from "providers/stats/solanaClusterStats";
import { ChartOptions, ChartTooltipModel } from "chart.js";
import { PerformanceInfo } from "providers/stats/solanaPerformanceInfo";
import { StatsNotReady } from "pages/ClusterStatsPage";
import { useTranslation } from "react-i18next";
import classes from "classnames";

export function TpsCard() {
  const performanceInfo = usePerformanceInfo();
  const isStatusNotReady = performanceInfo.status !== ClusterStatsStatus.Ready;

  if (isStatusNotReady) return <StatsNotReady error={false} />;

  return (
    <div className="custom-card mb-4">
      {isStatusNotReady ? (
        <StatsNotReady error={false} />
      ) : (
        <TpsBarChart performanceInfo={performanceInfo} />
      )}
    </div>
  );
}

type Series = "short" | "medium" | "long";
const SERIES: Series[] = ["short", "medium", "long"];
const SERIES_INFO = {
  short: {
    label: (index: number) => index,
    interval: "30m",
  },
  medium: {
    label: (index: number) => index * 4,
    interval: "2h",
  },
  long: {
    label: (index: number) => index * 12,
    interval: "6h",
  },
};

const CUSTOM_TOOLTIP = function (this: any, tooltipModel: ChartTooltipModel) {
  // Tooltip Element
  let tooltipEl = document.getElementById("chartjs-tooltip");

  // Create element on first render
  if (!tooltipEl) {
    tooltipEl = document.createElement("div");
    tooltipEl.id = "chartjs-tooltip";
    tooltipEl.innerHTML = `<div class="content"></div>`;
    document.body.appendChild(tooltipEl);
  }

  // Hide if no tooltip
  if (tooltipModel.opacity === 0) {
    tooltipEl.style.opacity = "0";
    return;
  }

  // Set Text
  if (tooltipModel.body) {
    const { label, value } = tooltipModel.dataPoints[0];
    const tooltipContent = tooltipEl.querySelector("div");
    if (tooltipContent) {
      let innerHtml = `<div class="value">${value} TPS</div>`;
      innerHtml += `<div class="label">${label}</div>`;
      tooltipContent.innerHTML = innerHtml;
    }
  }

  // Enable tooltip and set position
  const canvas: Element = this._chart.canvas;
  const position = canvas.getBoundingClientRect();
  tooltipEl.style.opacity = "1";
  tooltipEl.style.left =
    position.left + window.pageXOffset + tooltipModel.caretX + "px";
  tooltipEl.style.top =
    position.top + window.pageYOffset + tooltipModel.caretY + "px";
};

const CHART_OPTIONS = (historyMaxTps: number): ChartOptions => {
  return {
    tooltips: {
      intersect: false, // Show tooltip when cursor in between bars
      enabled: false, // Hide default tooltip
      custom: CUSTOM_TOOLTIP,
    },
    legend: {
      display: false,
    },
    scales: {
      xAxes: [
        {
          ticks: {
            display: false,
          },
          gridLines: {
            display: false,
          },
        },
      ],
      yAxes: [
        {
          ticks: {
            stepSize: 100,
            fontSize: 10,
            fontColor: "#EEE",
            beginAtZero: true,
            display: true,
            suggestedMax: historyMaxTps,
          },
          gridLines: {
            display: false,
          },
        },
      ],
    },
    maintainAspectRatio: false,
    animation: {
      duration: 0, // general animation time
    },
    hover: {
      animationDuration: 0, // duration of animations when hovering an item
    },
    responsiveAnimationDuration: 0, // animation duration after a resize
  };
};

type TpsBarChartProps = { performanceInfo: PerformanceInfo };
function TpsBarChart({ performanceInfo }: TpsBarChartProps) {
  const { perfHistory, historyMaxTps } = performanceInfo;
  const [series, setSeries] = React.useState<Series>("short");
  const { t } = useTranslation();

  const seriesData = perfHistory[series];
  const chartOptions = React.useMemo(
    () => CHART_OPTIONS(historyMaxTps),
    [historyMaxTps]
  );

  const seriesLength = seriesData.length;
  const chartData: Chart.ChartData = {
    labels: seriesData.map((val, i) => {
      return `${SERIES_INFO[series].label(seriesLength - i)}min ago`;
    }),
    datasets: [
      {
        backgroundColor: "#21D969",
        hoverBackgroundColor: "#FFFFFF",
        borderWidth: 0,
        data: seriesData.map((val) => val || 0),
      },
    ],
  };

  return (
    <div className="tps-card">
      <div className="d-flex">
        <div className="tps-card__amount">
          <div className="text-second text-sm mb-2">{t("current_tps")}</div>
          <h1 className="text-primary mb-4 font-weight-bold">
            {Math.round(performanceInfo.avgTps).toLocaleString()}
          </h1>
          <div className="text-second text-sm mb-2 ">
            {t("total_transactions")}
          </div>
          <h1 className="text-primary mb-4 font-weight-bold">
            {performanceInfo.transactionCount.toLocaleString()}
          </h1>
        </div>
        <div className="tps-card__chart">
          <div className="font-size-sm">
            <div className="d-flex justify-content-end mb-3">
              {SERIES.map((key) => (
                <button
                  key={key}
                  onClick={() => setSeries(key)}
                  className={classes("btn btn-sm border-base ms-2", {
                    active: series === key,
                  })}
                >
                  {SERIES_INFO[key].interval}
                </button>
              ))}
            </div>
            <div style={{ height: "120px" }}>
              <Bar data={chartData} options={chartOptions} height={80} />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
