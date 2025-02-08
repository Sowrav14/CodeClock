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
      "< 5 min": 0,
      "< 10 min": 0,
      "< 15 min": 0,
      "< 20 min": 0,
      "< 25 min": 0,
      "< 30 min": 0,
      "30+ min": 0,
    };

    problems.forEach(({ time }) => {
      if (time < 5) timeRanges["< 5 min"]++;
      else if (time < 10) timeRanges["< 10 min"]++;
      else if (time < 15) timeRanges["< 15 min"]++;
      else if (time < 20) timeRanges["< 20 min"]++;
      else if (time < 25) timeRanges["< 25 min"]++;
      else if (time < 30) timeRanges["< 30 min"]++;
      else timeRanges["30+ min"]++;
    });

    // Filter out zero values
    const filteredEntries = Object.entries(timeRanges).filter(([_, value]) => value > 0);

    const chartData = {
      labels: filteredEntries.map(([label, _]) => `${label}`),
      datasets: [
        {
          data: filteredEntries.map(([_, value]) => value),
          backgroundColor: [
            "#ff6384", "#36a2eb", "#ffcd56", "#4bc0c0", "#9966ff", "#ff9f40", "#c9cbcf"
          ],
          hoverBackgroundColor: [
            "#ff6384", "#36a2eb", "#ffcd56", "#4bc0c0", "#9966ff", "#ff9f40", "#c9cbcf"
          ],
        },
      ],
    };

    setData(chartData);
  };


  return (
    <div style={{display:"flex", flexDirection:'column', gap:'10px', border:'1px solid #F1F2EB'}}>
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
    </div>
  );
};

export default SolvedProblemsChart;

