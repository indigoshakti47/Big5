import React, { useState } from "react";
import Button from '@material-ui/core/Button'

import Question from "../components/Question";
import questions from "../questions/BFI.json";

const formatedQuestions = questions.map(question => ({
	question,
	selected: null
}));

export default function BFI() {
	const [currentIndex, setCurrent] = useState(0);
	const [selectedQuestions, setSelectedQuestions] = useState(formatedQuestions);

	const handleSelect = (option, index) => {
		const newSelected = selectedQuestions.map((question, i) => {
			if (i === index) {
				const newQuestion = {...question};
				newQuestion.selected = option;
				return newQuestion;
			}
			return question;
		});
		setSelectedQuestions(newSelected);
		if (currentIndex+1 < selectedQuestions.length) {
			setTimeout(() => setCurrent(currentIndex + 1), 500);
		} else {
			console.log(selectedQuestions);
		}
	}

	const currentQuestion = selectedQuestions[currentIndex];

  return <div className="questionary">
		<Question
			selected={currentQuestion.selected}
			question={currentQuestion.question}
			numOptions={5}
			onSelect={(option => handleSelect(option, currentIndex))}
		/>
		{ currentIndex >= 1 && <Button variant="contained" color="secondary" onClick={() => setCurrent(currentIndex - 1)}>Back</Button> }
	</div>;
}
