import React from "react";
import './Question.scss';

export default function Question({ question, numOptions, selected, onSelect }) {
	const opts = new Array(numOptions).fill(1)
  return (
	<div className="question">
	  <h2>{question}?</h2>
		<div className="options-container">
			<span>Strongly disagree</span>
			<div className="options">
				{opts.map(
				(_, i) => <div
					key={i}
					className={`options__item ${selected === i + 1 ? 'selected': ''}`}
					onClick={() => onSelect(i+1)}
					>
						{i+1}
					</div>
				)
				}
			</div>
			<span>Strongly agree</span>
		</div>
	</div>
  );
}
