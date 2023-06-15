import React from 'react'
import { Bar } from "react-chartjs-2"
//eslint-disable-next-line
import chartjs from "chart.js/auto"

function Chart({ chartData }) {
  return (
    <div>
      <Bar
        data={{
          labels: chartData.map((item) => item.Grade).reverse(),
          datasets: [
            {
              label: "SGPA",
              data: chartData.map((item) => item.Count).reverse(),
              backgroundColor: chartData.map((item) => {
                if (item.Count > 30) return "#009500"
                else if (item.sgpa > 15) return "#fafa00"
                else if (item.Count > 2) return "yellow"
                else return "#fd0101"
              }).reverse(),
              borderWidth: 1,
              barThickness: 40,

            }
          ]
        }}
        options={{
          plugins: {
            title: {
              display: true,
              text: "Student Performance"
            },
            legend: {
              display: false
            }
          },
          scales: {
            x: {
              grid: {
                display: false
              },
              title: {
                display: true,
                text: "Grade"
              }
            },
            y: {
              grid: {
                display: false
              },
              title: {
                display: true,
                text: "No. of Sudents"
              },
              min: 0,
              max: 80,
              beginAtZero: true
            }
          },

        }}
      />
    </div>
  )
}

export default Chart