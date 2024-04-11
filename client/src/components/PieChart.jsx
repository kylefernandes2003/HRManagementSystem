import { ResponsivePie } from "@nivo/pie";
import React, { useEffect, useState } from "react";
import { tokens } from "../theme";
import { useTheme } from "@mui/material";
// import { mockPieData as data } from "../assets/mockData";

const PieChart = ({ isDashboard = false }) => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  const [ageData, setAgeData] = useState([]);

  useEffect(() => {
    const fetchAgeData = async () => {
      try {
        const response = await fetch("http://localhost:5000/api/auth/age-dist");

        if (response.ok) {
          const data = await response.json();
          // Transform data to match the expected format
          const formattedData = data.map((item) => ({
            id: item.ageCategory,
            label: item.ageCategory,
            value: item.count,
            color: colors[item.ageCategory], // Optionally assign colors based on age category
          }));
          setAgeData(formattedData);
        } else {
          console.error("Failed to fetch Age data");
        }
      } catch (error) {
        console.log("Error fetching Age data:", error);
      }
    };

    fetchAgeData();
  }, []);

  return (
    <ResponsivePie
      data={ageData}
      theme={{
        tooltip: {
          container: {
            background: "#000",
            color: "#fff",
          },
        },
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
      margin={{ top: 40, right: 80, bottom: 80, left: 80 }}
      innerRadius={0.5}
      padAngle={0.7}
      cornerRadius={3}
      activeOuterRadiusOffset={8}
      borderColor={{
        from: "color",
        modifiers: [["darker", 0.2]],
      }}
      arcLinkLabelsSkipAngle={10}
      arcLinkLabelsTextColor={colors.grey[100]}
      arcLinkLabelsThickness={2}
      arcLinkLabelsColor={{ from: "color" }}
      enableArcLabels={false}
      arcLabelsRadiusOffset={0.4}
      arcLabelsSkipAngle={7}
      arcLabelsTextColor={{
        from: "color",
        modifiers: [["darker", 2]],
      }}
      defs={[
        {
          id: "dots",
          type: "patternDots",
          background: "inherit",
          color: "rgba(255, 255, 255, 0.3)",
          size: 4,
          padding: 1,
          stagger: true,
        },
        {
          id: "lines",
          type: "patternLines",
          background: "inherit",
          color: "rgba(255, 255, 255, 0.3)",
          rotation: -45,
          lineWidth: 6,
          spacing: 10,
        },
      ]}
      legends={
        isDashboard
          ? undefined
          : [
              {
                anchor: "bottom",
                direction: "row",
                justify: false,
                translateX: 0,
                translateY: 56,
                itemsSpacing: 0,
                itemWidth: 100,
                itemHeight: 18,
                itemTextColor: "#999",
                itemDirection: "left-to-right",
                itemOpacity: 1,
                symbolSize: 18,
                symbolShape: "circle",
                effects: [
                  {
                    on: "hover",
                    style: {
                      itemTextColor: "#000",
                    },
                  },
                ],
              },
            ]
      }
    />
  );
};

export default PieChart;
