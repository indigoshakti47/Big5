import React, { useState } from "react";
import { useHistory } from 'react-router-dom';
import axios from "axios"
import './PersonalForm.scss';

import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import CardHeader from '@material-ui/core/CardHeader';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';

export default function PersonalForm() {
	const [formData, setFormData] = useState({
		name: '',
		age: '',
		gender: '',
		stratum: '',
		educationalLevel: '',
		Nationality: '',
		profession: '',
		hobbies: ''
	});

	const router = useHistory();

	const handleChange = ({ target }) => {
		setFormData({
			...formData,
			[target.name]: target.value
		});
	}

	const handleSubmit = (e) => {
		e.preventDefault();
		console.log(formData);

		axios({
			url: '/api/user',
			method: 'post',
			data: {
				formData: formData
			},
			headers: {
				Accept: "application/json",
				"Content-Type": "application/json",
			},
		}).then((response) => {
				console.log(response);

				//localStorage.setItem('testerId', response.data.data.user);
				//localStorage.setItem('testerUsername', formData.name);
				//setTimeout(() => router.push('bfi'), 1400);
		}).catch((error) => {
				console.log(error);
		});
	}

	return (
    <div className="PersonalInfo">

			<Card>
				<CardHeader className="PersonalInfo__title" title="Personal Information">
				</CardHeader>
				<CardContent>
					<form onSubmit={handleSubmit}>
						<TextField className="PersonalInfo__input" required name="name" onChange={handleChange} value={formData.name} label="Name" />
						<TextField className="PersonalInfo__input" required name="age" type="number" onChange={handleChange} value={formData.age} label="Age" />
						<TextField className="PersonalInfo__input" required name="gender" onChange={handleChange} value={formData.gender} label="Gender" />
						<TextField className="PersonalInfo__input" inputProps={{ min: 0, max: 6 }} type="number" required name="stratum" onChange={handleChange} value={formData.stratum} label="Stratum" />
						<TextField className="PersonalInfo__input" required name="educationalLevel" onChange={handleChange} value={formData.educationalLevel} label="Educational Level" />
						<TextField className="PersonalInfo__input" required name="Nationality" onChange={handleChange} value={formData.Nationality} label="Nationality" />
						<TextField className="PersonalInfo__input" required name="profession" onChange={handleChange} value={formData.profession} label="Profession" />
						<TextField className="PersonalInfo__input" required name="hobbies" onChange={handleChange} value={formData.hobbies} label="Hobbies" />
						<div className="PersonalInfo__button">
							<Button variant="contained" color="secondary" type="submit">
								Next
							</Button>
						</div>
					</form>
				</CardContent>
			</Card>
    </div>
  );
}
