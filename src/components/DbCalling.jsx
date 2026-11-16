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
  React.useEffect(() => {
    console.log(fetchMetric().then((data) => console.log(data)));
  }, []);

  return <div>DbCalling</div>;
};

export default DbCalling;
