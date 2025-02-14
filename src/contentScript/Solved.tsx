import formatTime from "./timeformat";

export default function Solved({time} : {time:number}) {
	// console.log("In the solved function ", time);
	return (
		<div className="app">
			<h3 style={{marginBottom:'10px'}}> Well Done </h3>
			<h5 style={{textAlign:'center'}}> You have solved the problem. </h5>
			{ time === -1.0 ?
			<h5 style={{textAlign:'center', marginBottom:'10px', marginTop:'10px'}}> You didn't used codeclock in this problem. </h5> :
			<h4 style={{marginBottom:'10px', marginTop:'10px'}}> {formatTime(time)}  </h4>
			}
		</div>
	);
}
