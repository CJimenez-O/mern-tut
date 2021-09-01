import React, { useState } from "react";
import { useHistory } from "react-router-dom";

const handleErrors = (response) => {
	if (!response.ok) {
		throw Error(response.statusText);
	}
	return response.json();
};

function RegisterPage() {
	const history = useHistory();
	const [username, setUsername] = useState("");
	const [password, setPassword] = useState("");
	const [isError, setError] = useState(false);

	const Register = (e) => {
		e.preventDefault();

		fetch("http://localhost:4000/register", {
			method: "POST",
			headers: {
				"Content-Type": "application/json",
			},
			body: JSON.stringify({
				username,
				password,
			}),
		})
			.then(handleErrors)
			.then(() => {
				history.push("/");
			})
			.catch((error) => {
				console.log(error);
				setError(true);
			});
	};

	return (
		<div>
			<h1>Register</h1>
			{isError && "User already exist"}
			<form onSubmit={Register}>
				<input
					type="text"
					onChange={(e) => {
						setUsername(e.target.value);
					}}
					placeholder="username"
				></input>
				<br></br>
				<input
					type="password"
					onChange={(e) => {
						setPassword(e.target.value);
					}}
					placeholder="password"
				></input>
				<br></br>
				<button type="submit">Sign Up</button>
			</form>
		</div>
	);
}

export default RegisterPage;
