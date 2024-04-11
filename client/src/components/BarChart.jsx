import { useTheme } from "@mui/material";
import { ResponsiveBar } from "@nivo/bar";
import { tokens } from "../theme";
import { useEffect, useState } from "react";

const BarChart = ({ isDashboard = false }) => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  const [turnoverData, setTurnoverData] = useState([]);

  useEffect(() => {
    const fetchTurnoverData = async () => {
      try {
        const response = await fetch(
          "http://localhost:5000/api/auth/turnover-rate"
        );

        if (response.ok) {
          const data = await response.json();
          setTurnoverData(data);
        } else {
          console.error("Failed to fetch turnover rate data");
        }
      } catch (error) {
        console.error("Error fetching turnover rate data:", error);
      }
    };

    fetchTurnoverData();
  }, []);

  return (
    <ResponsiveBar
      data={turnoverData}
      theme={{
        axis: {
          domain: {
            line: {
              stroke: colors.grey[100],
            },
          },
          legend: {
            text: {
              fill: colors.grey[100],
            },
          },
          ticks: {
            line: {
              stroke: colors.grey[100],
              strokeWidth: 1,
            },
            text: {
              fill: colors.grey[100],
            },
          },
        },
        legends: {
          text: {
            fill: colors.grey[100],
          },
        },
      }}
      keys={["turnoverRate"]}
      indexBy="department"
      margin={{ top: 50, right: 130, bottom: 50, left: 60 }}
      padding={0.3}
      valueScale={{ type: "linear" }}
      indexScale={{ type: "band", round: true }}
      colors={{ scheme: "category10" }} // Different color for each bar
      defs={[
        {
          id: "tooltip",
          type: "patternLines",
          background: "black", // Tooltip background color
          color: "#ffffff",
          rotation: -45,
          lineWidth: 4,
          spacing: 8,
        },
      ]}
      borderColor={{
        from: "color",
        modifiers: [["darker", "1.6"]],
      }}
      axisTop={null}
      axisRight={null}
      axisBottom={{
        tickSize: 5,
        tickPadding: 5,
        tickRotation: 0,
        legend: isDashboard ? undefined : "Department",
        legendPosition: "middle",
        legendOffset: 32,
      }}
      axisLeft={{
        tickSize: 5,
        tickPadding: 5,
        tickRotation: 0,
        legend: isDashboard ? undefined : "TurnOver Rate %",
        legendPosition: "middle",
        legendOffset: -40,
      }}
      enableLabel={false}
      labelSkipWidth={12}
      labelSkipHeight={12}
      labelTextColor={{
        from: "color",
        modifiers: [["darker", 1.6]],
      }}
      tooltip={(bar) => (
        <div
          style={{
            padding: "12px",
            background: "black", // Tooltip background color
            color: "white",
          }}
        >
          <strong>{bar.data.department}</strong>
          <br />
          Turnover Rate: {bar.data.turnoverRate}%
        </div>
      )}
      role="application"
    />
  );
};

export default BarChart;
