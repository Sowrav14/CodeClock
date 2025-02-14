import { useEffect, useState } from "react";
import { Bar } from "react-chartjs-2";
import { Chart, BarElement, CategoryScale, LinearScale, Tooltip, Legend } from "chart.js";
import { Actions } from "../background/background"; // Import your action types
import DBinstance from "../utils/indexedDB";

// Register Chart.js components
Chart.register(BarElement, CategoryScale, LinearScale, Tooltip, Legend);

const options = {
  responsive: true,
  plugins: {
    legend: {
      display: false,
    },
  },
  scales: {
    x: {
      title: { display: true, text: "Problem Rating", font: { size: 14 } },
    },
    y: {
      title: { display: true, text: "Average Time(min)", font: { size: 14 } },
      beginAtZero: true,
    },
  },
};

const getRandomColor = () => {
    const letters = "0123456789ABCDEF";
    let color = "#";
    for (let i = 0; i < 6; i++) {
        color += letters[Math.floor(Math.random() * 16)];
    }
    return color;
};

const ProblemRatingChart = () => {
  const [data, setData] = useState<any>(null);

  useEffect(() => {
    const fetchProblems = async () => {
      try {
        const response = await chrome.runtime.sendMessage({ type: Actions.GET_ALL });
        if (response && Array.isArray(response.problems)) {
          // console.log(response.problems);
          processChartData(response.problems);
        }
      } catch (error) {
        console.error("Error fetching problems:", error);
      }
    };

    fetchProblems();
  }, []);

  const processChartData = (problems: DBinstance[]) => {
    const ratingMap : { [key: string]: { total: number; count: number } } = {
			"other" : { total : 0, count : 0},
			"800" : { total : 0, count : 0},
			"900" : { total : 0, count : 0},
			"1000" : { total : 0, count : 0},
			"1100" : { total : 0, count : 0},
			"1200" : { total : 0, count : 0},
			"1300" : { total : 0, count : 0},
			"1400" : { total : 0, count : 0},
			"1500" : { total : 0, count : 0},
			"1600" : { total : 0, count : 0},
			"1700" : { total : 0, count : 0},
			"1800" : { total : 0, count : 0},
			"1900" : { total : 0, count : 0},
			"2000" : { total : 0, count : 0},
			"2100" : { total : 0, count : 0},
			"2200" : { total : 0, count : 0},
			"2300" : { total : 0, count : 0},
			"2400" : { total : 0, count : 0},
			"2500" : { total : 0, count : 0},
			"2600" : { total : 0, count : 0},
			"2700" : { total : 0, count : 0},
			"2800" : { total : 0, count : 0},
			"2900" : { total : 0, count : 0},
			"3000" : { total : 0, count : 0},
		};
    // Group by rating and calculate sum of times
    problems.forEach(({ rating, time }) => { 
		time = time / 60;
		if(rating == '800'){
			ratingMap['800'].count += 1;
			ratingMap['800'].total += time;
		} else if(rating == '900'){
			ratingMap['900'].count += 1;
			ratingMap['900'].total += time;
		} else if(rating == '1000'){
			ratingMap['1000'].count += 1;
			ratingMap['1000'].total += time;
		} else if(rating == '1100'){
			ratingMap['1100'].count += 1;
			ratingMap['1100'].total += time;
		} else if(rating == '1200'){
			ratingMap['1200'].count += 1;
			ratingMap['1200'].total += time;
		} else if(rating == '1300'){
			ratingMap['1300'].count += 1;
			ratingMap['1300'].total += time;
		} else if(rating == '1400'){
			ratingMap['1400'].count += 1;
			ratingMap['1400'].total += time;
		} else if(rating == '1500'){
			ratingMap['1500'].count += 1;
			ratingMap['1500'].total += time;
		} else if(rating == '1600'){
			ratingMap['1600'].count += 1;
			ratingMap['1600'].total += time;
		} else if(rating == '1700'){
			ratingMap['1700'].count += 1;
			ratingMap['1700'].total += time;
		} else if(rating == '1800'){
			ratingMap['1800'].count += 1;
			ratingMap['1800'].total += time;
		} else if(rating == '1900'){
			ratingMap['1900'].count += 1;
			ratingMap['1900'].total += time;
		} else if(rating == '2000'){
			ratingMap['2000'].count += 1;
			ratingMap['2000'].total += time;
		} else if(rating == '2100'){
			ratingMap['2100'].count += 1;
			ratingMap['2100'].total += time;
		} else if(rating == '2200'){
			ratingMap['2200'].count += 1;
			ratingMap['2200'].total += time;
		} else if(rating == '2300'){
			ratingMap['2300'].count += 1;
			ratingMap['2300'].total += time;
		} else if(rating == '2400'){
			ratingMap['2400'].count += 1;
			ratingMap['2400'].total += time;
		} else if(rating == '2500'){
			ratingMap['2500'].count += 1;
			ratingMap['2500'].total += time;
		} else if(rating == '2600'){
			ratingMap['2600'].count += 1;
			ratingMap['2600'].total += time;
		} else if(rating == '2700'){
			ratingMap['2700'].count += 1;
			ratingMap['2700'].total += time;
		} else if(rating == '2800'){
			ratingMap['2800'].count += 1;
			ratingMap['2800'].total += time;
		} else if(rating == '2900'){
			ratingMap['2900'].count += 1;
			ratingMap['2900'].total += time;
		} else if(rating == '3000'){
			ratingMap['3000'].count += 1;
			ratingMap['3000'].total += time;
		} else {
			ratingMap['other'].count += 1;
			ratingMap['other'].total += time;
		}
			
    });

    // Compute average time per rating
    const ratings = Object.keys(ratingMap);
	const avgTimes = ratings.map((rating) =>
		ratingMap[rating].count > 0 ? ratingMap[rating].total / ratingMap[rating].count : 0
	);
	// console.log(problems, ratingMap, ratings, avgTimes);
    // Chart data
	const bgColor = getRandomColor();
	const borderColor = getRandomColor();
    const chartData = {
      labels: ratings.map((r) => `${r}`),
      datasets: [
        {
          label: "Average Time",
          data: avgTimes,
          backgroundColor: bgColor,
          borderColor: borderColor,
          borderWidth: 1,
        },
      ],
    };
		// console.log(chartData);
    setData(chartData);
  };

//   console.log(data);
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
			alignItems: "center",
			justifyContent : "center",
			justifyItems : "center",
			alignContent : "center", 
		}}>
			<h3 style={{fontSize:'1.5rem', padding:'5px', letterSpacing:'1.2px', fontWeight:'bold', textAlign:'center'}}> Average Problem Solving Time by Rating </h3>
      {data ? <Bar data={data} options={options} /> : <p>Loading chart...</p>}
    </div> : null}
	</div>
  );
};

export default ProblemRatingChart;
