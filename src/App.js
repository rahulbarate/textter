import "./App.css";
import ChatScreen from "./ChatScreen";
import Login from "./Login";
// import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import { BrowserRouter as Router } from "react-router-dom";
import { useStateValue } from "./StateProvider";
// import HomeScreen from "./HomeScreen";
// import Demo from "./Demo";

function App() {
	const [{ user }, dispatch] = useStateValue();

	return (
		// 	<div className="app">
		// 		<div className="app__body">
		// 			<Router>
		// 				{/* <HomeScreen /> */}
		// 				<ChatScreen />
		// 				{/* <Login /> */}
		// 				{/* <Route path="/demo">
		// 						<Demo />
		// 					</Route> */}
		// 			</Router>
		// 		</div>
		// 	</div>
		// );
		<div className="app">
			{/* if user is not logged in then goto login*/}
			{!user ? (
				<Login />
			) : (
				<div className="app__body">
					<Router>
						<ChatScreen />
					</Router>
				</div>
			)}
		</div>
	);
}

export default App;
