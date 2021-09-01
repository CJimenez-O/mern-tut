import React, { BrowserRouter, Switch, Route } from "react-router-dom";
import "./App.css";
import Register from "./pages/RegisterPage";
import Welcome from "./pages/Welcome";

function App() {
	return (
		<BrowserRouter>
			<div className="App">
				<Switch>
					<Route path="/" exact>
						<Welcome> </Welcome>
					</Route>
					<Route path="/register" exact>
						<Register></Register>
					</Route>
				</Switch>
			</div>
		</BrowserRouter>
	);
}

export default App;
