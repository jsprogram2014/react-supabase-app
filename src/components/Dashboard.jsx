import React from "react";
import supabaseClient from "../supabase-client";
import { Chart } from "react-charts";
import Form from "./Form";

const fetchMetric = async () => {
  try {
    const { data, error } = await supabaseClient.from("sales_deals").select(
      ` name,
        value.sum()   `,
    );
    if (error) {
      throw error;
    }
    return data;
  } catch (error) {
    console.log("error metrics :", error);
  }
};

const Dashboard = () => {
  const [datas, setDatas] = React.useState([]);

  React.useEffect(() => {
    fetchMetric().then((data) => setDatas(data));

    const channel = supabaseClient
      .channel("deal-changes")
      .on(
        "postgres_changes",
        { event: "*", schema: "public", table: "sales_deals" },
        (payload) => {
          console.log(payload);
          fetchMetric().then((data) => setDatas(data));
          const { new: newRecord, eventType } = payload;
          const { name, value } = newRecord;
          if (eventType === "INSERT") {
            console.log("insert happened");
          }
        },
      )
      .subscribe();

    //clean up the side effect since it can be still there even when the component is unmounted
    return () => {
      supabaseClient.removeChannel("deal-changes");
    };
  }, []);

  const chartData = React.useMemo(() => [
    {
      data: datas.map((item) => ({
        primary: item.name,
        secondary: item.sum,
      })),
    },
  ]);

  const primaryAxis = {
    getValue: (d) => d.primary,
    scaleType: "band",
    padding: 0.2,
    position: "bottom",
  };

  const secondaryAxes = [
    {
      getValue: (d) => d.secondary,
      scaleType: "linear",
      min: 0,
      max: y_max(),
      padding: {
        top: 20,
        bottom: 40,
      },
    },
  ];

  function y_max() {
    // Only calculate a max if there's data (Math.max() with no args returns -Infinity)
    if (datas.length > 0) {
      // 1. metrics.map((m) => m.sum) -> pulls out just the sums, e.g. [3000, 7500, 1200]
      // 2. ...                       -> spreads the array into separate args: Math.max(3000, 7500, 1200)
      // 3. Math.max(...)             -> returns the largest sum, e.g. 7500
      const maxSum = Math.max(...datas.map((m) => m.sum));
      console.log(maxSum);

      // Add 2000 of headroom so the tallest bar doesn't touch the top of the chart
      return Math.ceil((maxSum + 2000) / 1000) * 1000;
    }

    // No data yet: use 5000 as the default y-axis max
    return 5000;
  }

  return (
    <div style={{ display: "flex", flexDirection: "column" }}>
      <h1>Total Sales for this Quarter</h1>

      <div style={{ height: "350px", marginBottom: "40px" }}>
        <Chart
          options={{
            data: chartData,
            primaryAxis,
            secondaryAxes,
            type: "bar",
            defaultColors: ["#54f567"],
            tooltip: { show: false },
          }}
        />
      </div>

      <Form metrics={datas} />
    </div>
  );
};

export default Dashboard;
