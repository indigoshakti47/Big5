import React, { useState } from "react";
import Button from '@material-ui/core/Button'

import Question from "../components/Question";
import questions from "../questions/SERVQUAL.json";

//import { v4 as uuidv4 } from "uuid"
import axios from "axios"

const formatedQuestions = questions.map(question => ({
	question,
	selected: null
}));

export default function Servqual(props) {
	const [currentIndex, setCurrent] = useState(0);
	const [selectedQuestions, setSelectedQuestions] = useState(formatedQuestions);

	const handleSelect = (option, index) => {
		console.log(option, index)
		const newSelected = selectedQuestions.map((question, i) => {
			if (i === index) {
				const newQuestion = { ...question };
				newQuestion.selected = option;
				return newQuestion;
			}
			return question;
		});
		setSelectedQuestions(newSelected);
		if (currentIndex + 1 < selectedQuestions.length) {
			setTimeout(() => setCurrent(currentIndex + 1), 100);
		} else {

			axios({
				url: '/api/servqual',
				method: 'post',
				data: {
					"servqual": newSelected,
					"user": localStorage.getItem('testerId'),
					"username": localStorage.getItem('testerUsername')
				},
				headers: {
					Accept: "application/json",
					"Content-Type": "application/json",
				},
			}).then(function (response) {
					console.log(response);
					setTimeout(() => props.history.push(`/resultservqual`), 1400);
			}).catch(function (error) {
					console.log(error);
			});

			console.log(newSelected)
		}
	}

	const currentQuestion = selectedQuestions[currentIndex];

	return <div className="questionary">
		<Question
			selected={currentQuestion.selected}
			question={currentQuestion.question}
			numOptions={7}
			onSelect={(option => handleSelect(option, currentIndex))}
		/>
		{currentIndex >= 1 && <Button variant="contained" color="secondary" onClick={() => setCurrent(currentIndex - 1)}>Back</Button>}
	</div>;
}
