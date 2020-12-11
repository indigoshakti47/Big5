import React, { useState } from "react";
import { useHistory } from 'react-router-dom';
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
		nacionality: '',
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

	const hadleSubmit = (e) => {
		e.preventDefault();
		console.log(formData);
		router.push('bfi');
	}

	return (
    <div className="PersonalInfo">

			<Card>
				<CardHeader className="PersonalInfo__title" title="Personal Information">
				</CardHeader>
				<CardContent>
					<form onSubmit={hadleSubmit}>
						<TextField className="PersonalInfo__input" required name="name" onChange={handleChange} value={formData.name} label="Name" />
						<TextField className="PersonalInfo__input" required name="age" type="number" onChange={handleChange} value={formData.age} label="Age" />
						<TextField className="PersonalInfo__input" required name="gender" onChange={handleChange} value={formData.gender} label="Gender" />
						<TextField className="PersonalInfo__input" inputProps={{ min: 0, max: 6 }} type="number" required name="stratum" onChange={handleChange} value={formData.stratum} label="Stratum" />
						<TextField className="PersonalInfo__input" required name="educationalLevel" onChange={handleChange} value={formData.educationalLevel} label="Educational Level" />
						<TextField className="PersonalInfo__input" required name="nacionality" onChange={handleChange} value={formData.nacionality} label="Nacionality" />
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
