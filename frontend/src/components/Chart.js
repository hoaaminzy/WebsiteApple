import React from "react";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
  LineChart,
  Line,
} from "recharts";
const Chart = ({ data }) => {
  return (
    <>
      <ResponsiveContainer width="100%" height={400}>
        <BarChart
          data={data}
          margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
        >
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="name" />
          <YAxis />
          <Tooltip />
          <Legend />
          <Bar dataKey="count" fill="blue" />
        </BarChart>
      </ResponsiveContainer>
      <div className="d-flex items-center justify-center pt-5">
        <LineChart width={900} height={300} data={data}>
          <XAxis dataKey="name" />
          <YAxis />
          <CartesianGrid stroke="#eee" strokeDasharray="5 5" />
          <Line type="monotone" dataKey="count" stroke="#8884d8" />
          {/* <Line type="monotone" dataKey="pv" stroke="#82ca9d" /> */}
        </LineChart>
      </div>
    </>
  );
};

export default Chart;
