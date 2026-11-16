import React from "react";
import supabaseClient from "../supabase-client";

const DbCalling = async () => {
  const { data, error } = await supabaseClient
    .from("sales_deals")
    .select(
      `
        name,
        value`,
    )
    .order("value", { ascending: false })
    .limit(1);
  return <div>DbCalling</div>;
};

export default DbCalling;
