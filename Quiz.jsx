import { useRef, useState } from "react";
import "./Quiz.css";
import { data } from "./assets/data";
const Quiz = () => {
	let [idx, setidx] = useState(0);
	let [score, setscore] = useState(0);
	let [disable, setdisable] = useState(false);
	let [res, setres] = useState(false);
	let [ques, setques] = useState(data[idx]);

	let option1 = useRef(null);
	let option2 = useRef(null);
	let option3 = useRef(null);
	let option4 = useRef(null);
	let optSet = [option1, option2, option3, option4];

	const checkAns = (e, answer) => {
		if (!disable) {
			if (ques.ans === answer) {
				e.target.classList.add("right");
				setscore((prev) => {
					return prev + 1;
				});
			} else {
				e.target.classList.add("wrong");
				optSet[ques.ans - 1].current.classList.add("right");
			}
			setdisable(true);
		}
	};
	const nextQues = () => {
		if (disable) {
			if (idx == data.length - 1) {
				setres(true);
				return;
			}
			setidx(++idx);
			setques(data[idx]);
			setdisable(false);
			optSet.forEach((o) => {
				o.current.classList.remove("right");
				o.current.classList.remove("wrong");
			});
		}
	};
	const reset = () => {
		setidx(0);
		setques(data[0]);
		setscore(0);
		setres(false);
		setdisable(false);
	}


	return (
		<div className="quizbox">
			<h1 id="title">Quiz App</h1>
			<div className="line"></div>
			{res ? (
				<h2 id="resbox">
					You scored {score} out of {data.length}
					<button onClick={() => {
						reset();
					}} id="reset">Reset</button>
				</h2>
			) : (
				<>
					<h3 id="question">
						{idx + 1}.{ques.question}
					</h3>
					<ul>
						<li
							ref={option1}
							onClick={(e) => {
								checkAns(e, 1);
							}}
						>
							{ques.option1}
						</li>
						<li
							ref={option2}
							onClick={(e) => {
								checkAns(e, 2);
							}}
						>
							{ques.option2}
						</li>
						<li
							ref={option3}
							onClick={(e) => {
								checkAns(e, 3);
							}}
						>
							{ques.option3}
						</li>
						<li
							ref={option4}
							onClick={(e) => {
								checkAns(e, 4);
							}}
						>
							{ques.option4}
						</li>
					</ul>
					<button
						onClick={() => {
							nextQues();
						}}
					>
						Next
					</button>
					<p>
						{idx + 1} of {data.length} questions
					</p>
				</>
			)}
		</div>
	);
};

export default Quiz;
