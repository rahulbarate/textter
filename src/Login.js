import { Button } from "@material-ui/core";
import React from "react";
import "./Login.css";
import { actionTypes } from "./reducer";
import { useStateValue } from "./StateProvider";
import db, { auth, provider } from "./Firebase";

function Login() {
	// here we will use dispatch to set user details.
	const [{ user }, dispatch] = useStateValue();

	// setting user in context using dispatch so it can be used every where
	const signIn = () => {
		auth.signInWithPopup(provider)
			.then((result) => {
				// console.log(result);
				// dispatching using set user
				// setting user details in context for further usage
				dispatch({
					type: actionTypes.SET_USER, // mentioning action type
					user: result.user, // sending user details to store.
				});

				db.collection("users").onSnapshot((snapshot) => {
					let isUserExist = snapshot.docs.find(
						(doc) => doc.id === result.user.email
					);
					if (isUserExist) {
						db.collection("users").doc(result.user.email).update({
							name: result.user.displayName,
							photoURL: result.user.photoURL,
						});
					} else {
						db.collection("users").doc(result.user.email).set({
							name: result.user.displayName,
							photoURL: result.user.photoURL,
						});
					}
				});

				// console.log(result.user);
				// if()
				// db.collection("users").doc(result.user.email).add(result.user);
			})
			.catch((err) => console.log(err.message));
	};

	return (
		<div className="login">
			<div className="login__container">
				<img
					src="https://i.pinimg.com/474x/76/46/a4/7646a4524062c57454e5139dd8d3a648.jpg"
					alt=""
				/>
				<div className="login__text">
					<b>Sign In to Textter</b>
				</div>
				<Button onClick={signIn}>Login with Google</Button>
			</div>
		</div>
	);
}

export default Login;
