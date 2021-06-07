import { Avatar, TextField } from "@material-ui/core";
// import React, { useEffect, useRef, useState } from "react";
import React, { useEffect, useState } from "react";
import {
	Button,
	Form,
	Modal,
	ModalBody,
	ModalFooter,
	ModalHeader,
} from "reactstrap";
import "./ChatCard.css";
// import ChatModal from "./ChatModal";
import db from "./Firebase";
import firebase from "firebase";
// import { actionTypes } from "./reducer";
import { useStateValue } from "./StateProvider";
import { makeStyles } from "@material-ui/core/styles";

// for size of avatar
const useStyles = makeStyles((theme) => ({
	root: {
		display: "flex",
		"& > *": {
			margin: theme.spacing(1),
		},
	},
	large: {
		width: theme.spacing(7),
		height: theme.spacing(7),
	},
}));

//
//
// main component
function ChatCard(props) {
	const [show, setShow] = useState(false);
	const [input, setInput] = useState("");
	const [chatMessages, setChatMessages] = useState([]);
	const [{ user }, dispatch] = useStateValue();
	// for avatar size
	const classes = useStyles();

	const handleShow = () => setShow(true);
	const toggle = () => setShow(!show);

	//
	//
	//
	//   Event to send Message
	const sendMessage = (event) => {
		//
		//   preventing default
		event.preventDefault();

		const currenUserRef = db
			.collection("users")
			.doc(user.email) //-----------------------.doc("rahul@gmail.com")
			.collection("Chats");

		const chatUserRef = db
			.collection("users")
			.doc(props.chatDetails.id)
			.collection("Chats");

		// const allUsersref = db.collection("users");

		currenUserRef.onSnapshot((snapshot) => {
			let val = snapshot.docs.find(
				(doc) => doc.id === props.chatDetails.id
			);
			if (!val) {
				currenUserRef.doc(props.chatDetails.id).set({
					name: props.chatDetails.name,
					photoURL: props.chatDetails.photoURL,
				});
				chatUserRef
					.doc(user.email) //--------------------.doc("rahul@gmail.com")
					.set({ name: user.displayName, photoURL: user.photoURL });
			}
		});

		//
		// adding chat message at current user end
		db.collection("users")
			.doc(user.email) // -----------------------------.doc("rahul@gmail.com")
			.collection("Chats")
			.doc(props.chatDetails.id)
			.collection("ChatList")
			.add({
				sender: user.email, //-------------------"rahul@gmail.com"
				text: input,
				timestamp: firebase.firestore.FieldValue.serverTimestamp(),
			});

		//
		// adding chat message at chat user's end
		db.collection("users")
			.doc(props.chatDetails.id)
			.collection("Chats")
			.doc(user.email) // -----------------.doc("rahul@gmail.com")
			.collection("ChatList")
			.add({
				sender: user.email, //----------------------
				text: input,
				timestamp: firebase.firestore.FieldValue.serverTimestamp(),
			});

		setInput("");
	};

	//
	//
	//
	// use effect to get all the chat messages and set them in chat screen
	useEffect(() => {
		db.collection("users")
			.doc(user.email) //--------------------------
			.collection("Chats")
			.doc(props.chatDetails.id)
			.collection("ChatList")
			.orderBy("timestamp", "desc")
			.onSnapshot((snapshot) => {
				setChatMessages(
					snapshot.docs.map((doc) => ({
						id: doc.id,
						sender: doc.data().sender,
						text: doc.data().text,
						timestamp: doc.data().timestamp,
					}))
				);
			});

		// console.log(chatMessages);
	}, [props.chatDetails.id]);

	//
	//
	//
	//
	// return statement
	// creating modal and returning it.

	return (
		<div>
			<div className="card ChatCard" onClick={handleShow}>
				<div className="card-body" title={props.chatDetails.id}>
					<div className="card-text">
						<div className="row">
							<div className="col-sm-2">
								{/* profile picture */}
								<Avatar
									style={{
										margin: "auto",
									}}
									className={classes.large}
									src={props.chatDetails.photoURL}
								/>
							</div>
							<div className="col-sm">
								{/* chat user name */}
								<h4>{props.chatDetails.name}</h4>
								{/* last message */}
								<div className="card-text">
									{chatMessages[0]?.text}
								</div>
							</div>
						</div>
					</div>
				</div>
			</div>

			{/* creating modal */}
			<Modal
				isOpen={show}
				toggle={toggle}
				className="modal-dialog modal-md modal-dialog-scrollable"
			>
				{/* Head section */}
				<ModalHeader toggle={toggle}>
					<div className="row">
						<div className="col-sm-3">
							<Avatar src={props.chatDetails.photoURL} />
						</div>
						<div className="col-sm">{props.chatDetails.name}</div>
					</div>
				</ModalHeader>

				{/* body section */}
				<ModalBody
					style={{
						height: "500px",
						display: "flex",
						flexDirection: "column-reverse",
						overflow: "auto",
					}}
					id="mbody"
				>
					{/* appending all the messages */}

					{chatMessages &&
						chatMessages.map((chatMessage) => (
							<p
								className={`chat__message ${
									chatMessage.sender === user.email &&
									"chat__sender"
								}`}
								key={chatMessage.id}
							>
								{chatMessage.text}
								{/* <span className="chat__timestamp">
									{() => {
										let timestr = "";
										timestr = new Date(
											chatMessage.timestamp?.toDate()
										)
											.getHours()
											.toString();
										timestr += new Date(
											chatMessage.timestamp?.toDate()
										)
											.getMinutes()
											.toString();
										console.log(timestr);

										return timestr;
									}}
								</span> */}
							</p>
						))}
					{/* {chatMessages &&
						chatMessages.map((chatMessage) => (
							<h1 key={chatMessage.id}>{chatMessage.text}</h1>
						))} */}
				</ModalBody>

				{/* footer section */}
				<ModalFooter style={{ position: "relative" }}>
					<Form>
						{/* <Input type="text" name="message" /> */}
						<TextField
							id="outlined-basic"
							label="Type Here"
							variant="outlined"
							size="small"
							style={{
								position: "absolute",
								left: "5px",
								width: "80%",
							}}
							value={input}
							onChange={(event) => setInput(event.target.value)}
						/>
						<Button
							type="submit"
							color="primary"
							onClick={sendMessage}
							disabled={!input}
						>
							Send
						</Button>
					</Form>
				</ModalFooter>
			</Modal>
		</div>
	);
}

export default ChatCard;
