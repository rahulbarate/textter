import React, { useEffect, useState } from "react";
import ChatCard from "./ChatCard";
import db from "./Firebase";
import "./ChatScreen.css";
// import { actionTypes } from "./reducer";
import { useStateValue } from "./StateProvider";
import { Avatar } from "@material-ui/core";

function ChatScreen() {
	//   const [users, setUser] = useState([]);
	const [chatList, setChatList] = useState([]);
	const [search, setSearch] = useState("");
	const [searchList, setSearchList] = useState([]);
	const [{ user }, dispatch] = useStateValue();

	//
	//
	//
	//
	// 1st- Execution
	// displaying chatlist (people with whom user have talked)
	useEffect(() => {
		db.collection("users")
			.doc(user.email) // ---------------------------------doc("rahul@gmail.com")
			.collection("Chats")
			.onSnapshot((snapshot) => {
				if (snapshot.size !== 0) {
					setChatList(
						snapshot.docs.map((doc) => ({
							id: doc.id,
							name: doc.data().name,
							photoURL: doc.data().photoURL,
						}))
					);
				}
			});
	}, []);

	//
	//
	// on event execution
	// use effect for search query
	useEffect(() => {
		db.collection("users").onSnapshot((snapshot) => {
			setSearchList(
				snapshot.docs
					.filter((doc) => {
						if (doc.data().name === search || doc.id === search) {
							//   console.log(doc.data());
							return doc;
						} else return null;
					})
					.map((doc) => ({
						id: doc.id,
						name: doc.data().name,
						photoURL: doc.data().photoURL,
					}))
			);
		});
	}, [search]);

	//
	//
	//
	// 2nd execution
	// return statement
	return (
		<div>
			<div className="rr">
				<div className="cc">
					<Avatar src={user.photoURL} />
				</div>
				<div className="cls2">
					<h5>{user.displayName}</h5>
					<h5>{user.email}</h5>
				</div>
				<div className="searchbar">
					<input
						type="text"
						placeholder="Search"
						onChange={(event) => setSearch(event.target.value)}
						value={search}
					/>
				</div>
			</div>
			<div className="heading">
				<h1>Chats</h1>
			</div>
			<div className="row mt-2">
				<div className="col-sm">
					{search ? (
						<nav1>
							<ul>
								{searchList &&
									searchList.map((chatDetails) => {
										return (
											<ChatCard
												key={chatDetails.id}
												chatDetails={chatDetails}
											/>
										);
									})}
							</ul>
						</nav1>
					) : (
						<nav1>
							<ul>
								{chatList &&
									chatList.map((chatDetails) => {
										return (
											<ChatCard
												key={chatDetails.id}
												chatDetails={chatDetails}
											/>
										);
									})}
							</ul>
						</nav1>
					)}
				</div>
			</div>
		</div>
	);
}

export default ChatScreen;
