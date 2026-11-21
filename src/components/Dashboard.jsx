import React from "react";
import supabaseClient from "../supabase-client";

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
  const [datas, setDatas] = React.useState();

  React.useEffect(() => {
    fetchMetric().then((data) => setDatas(data));
  }, []);

  return (
    <div>
      <h1>Dashboard</h1>
      {datas &&
        datas.map((item) => (
          <p>
            Name : {item.name}, Value : {item.sum}
          </p>
        ))}
    </div>
  );
};

export default Dashboard;
