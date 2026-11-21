import React from "react";
import supabaseClient from "../supabase-client";

const fetchMetric = async () => {
  const { data, error } = await supabaseClient
    .from("sales_deals")
    .select(
      `
        name,
        value`,
    )
    .order("value", { ascending: false })
    .limit(1);
  return data;
};

const DbCalling = () => {
  const [datas, setDatas] = React.useState();

  React.useEffect(() => {
    fetchMetric().then((data) => setDatas(data));
  }, []);

  return (
    <div>
      <h1>DbCalling</h1>
      {datas && (
        <p>
          Name : {datas[0].name}, Value : {datas[0].value}
        </p>
      )}
    </div>
  );
};

export default DbCalling;
