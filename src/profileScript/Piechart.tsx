import { useEffect, useState } from "react";
import DBinstance from "../utils/indexedDB";
import { Actions } from "../background/background";
import { Doughnut } from "react-chartjs-2";
import { Chart, ArcElement, Tooltip, Legend } from "chart.js";
// Register Chart.js components
Chart.register(ArcElement, Tooltip, Legend);

const options = {
  responsive: true,
  layout: {
    padding: {
      right: 50, // Adds gap between chart and legend
    },
  },
  plugins: {
    legend: {
      display: false, // Hide default legend
    },
  },
};

const SolvedProblemsChart = () => {
  const [data, setData] = useState<any>(null);

  useEffect(() => {
    const fetchSolvedProblems = async () => {
      try {
        const response = await chrome.runtime.sendMessage({ type:Actions.GET_ALL });
        if (response && Array.isArray(response.problems)) {
          processChartData(response.problems);
        }
      } catch (error) {
        console.error("Error fetching solved problems:", error);
      }
    };

    fetchSolvedProblems();
  }, []);

  const processChartData = (problems : DBinstance[]) => {
    const timeRanges = {
      "0 to 5 min": 0,
      "5 to 10 min": 0,
      "10 to 15 min": 0, 
      "15 to 20 min": 0, 
      "20 to 25 min": 0,
      "25 to 30 min": 0, 
      "30 to 40 min": 0,
      "40 to 50 min": 0,
      "50 to 60 min": 0,
      "60 to 70 min": 0,
      "70 to 80 min": 0,
      "80 to 90 min": 0,
      "90 to 100 min": 0,
      "100 to 110 min": 0,
      "110 to 120 min": 0,
      "120+ min": 0
    };

    problems.forEach(({ time }) => {
      time = time / 60;
      if (time < 5) timeRanges["0 to 5 min"]++;
        else if (time < 10) timeRanges["5 to 10 min"]++;
        else if (time < 15) timeRanges["10 to 15 min"]++;
        else if (time < 20) timeRanges["15 to 20 min"]++;
        else if (time < 25) timeRanges["20 to 25 min"]++;
        else if (time < 30) timeRanges["25 to 30 min"]++;
        else if (time < 40) timeRanges["30 to 40 min"]++;
        else if (time < 50) timeRanges["40 to 50 min"]++;
        else if (time < 60) timeRanges["50 to 60 min"]++;
        else if (time < 70) timeRanges["60 to 70 min"]++;
        else if (time < 80) timeRanges["70 to 80 min"]++;
        else if (time < 90) timeRanges["80 to 90 min"]++;
        else if (time < 100) timeRanges["90 to 100 min"]++;
        else if (time < 110) timeRanges["100 to 110 min"]++;
        else if (time < 120) timeRanges["120+ min"]++;
        else timeRanges["120+ min"]++;
    });

    // Filter out zero values
    const filteredEntries = Object.entries(timeRanges).filter(([_, value]) => value > 0);

    const chartData = {
      labels: filteredEntries.map(([label, _]) => `${label}`),
      datasets: [
        {
          data: filteredEntries.map(([_, value]) => value),
          backgroundColor: [
            "#ff6384", "#36a2eb", "#ffcd56", "#4bc0c0", "#9966ff", 
            "#ff9f40", "#c9cbcf", "#ff6384", "#36a2eb", "#ffcd56", 
            "#4bc0c0", "#9966ff", "#ff9f40", "#c9cbcf", "#ff6384"
          ],
          hoverBackgroundColor: [
            "#ff6384", "#36a2eb", "#ffcd56", "#4bc0c0", "#9966ff", 
            "#ff9f40", "#c9cbcf", "#ff6384", "#36a2eb", "#ffcd56", 
            "#4bc0c0", "#9966ff", "#ff9f40", "#c9cbcf", "#ff6384"
          ],
        },
      ],
    };

    setData(chartData);
  };

  // console.log(data);

  return (
    <div>
    {data && data.labels.length > 0 ?
    <div style={{
      display: "flex",
      flexDirection: "column",
      gap: "10px",
      borderRadius: "8px",
      padding: "10px",
      border: "1px solid #ddd",
      boxShadow: "0 4px 6px rgba(0, 0, 0, 0.1)",
      transition: "box-shadow 0.2s ease-in-out",
    }}>
      <h3 style={{fontSize:'1.5rem', padding:'5px', letterSpacing:'1.2px', fontWeight:'bold', textAlign:'center'}}> Problem Solving Time Distribution </h3>
    
      <div style={{ 
        display: "flex", 
        alignItems: "center",
        justifyContent : "center",
        justifyItems : "center",
        alignContent : "center",
        }}>
        <div style={{ width: "50%" }}>
          {data ? <Doughnut data={data} options={options} /> : <p>Loading chart...</p>}
        </div>
        <div
          style={{
            width: "250px",
            height: "300px",
            overflowY: "auto",
            border: "1px solid #ddd",
            borderRadius: "8px",
            padding: "10px",
            scrollbarWidth: "none", // Firefox
            msOverflowStyle: "none", // Internet Explorer 10+
          }}
        >
          <style>
            {`
              /* Hide scrollbar for Chrome, Safari and Edge */
              div::-webkit-scrollbar {
                display: none;
              }
            `}
          </style>
          {data && data.labels.length > 0 ? (
            data.labels.map((label: any, i: any) => (
              <div key={i} style={{ display: "flex", alignItems: "center", marginBottom: "5px" }}>
                <div
                  style={{
                    width: "12px",
                    height: "12px",
                    borderRadius: "50%",
                    backgroundColor: data.datasets[0].backgroundColor[i],
                    marginRight: "8px",
                  }}
                ></div>
                <span>{label} : {data.datasets[0].data[i]}</span>
              </div>
            ))
          ) : (
            <p>No data available</p>
          )}
        </div>
      </div>
    </div> : null }
    </div>
  );
};

export default SolvedProblemsChart;

