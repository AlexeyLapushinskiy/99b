import React, {Component} from 'react';
import LogIn from "../logIn/login";
import SignUp from "../registration/signup";

import {Main} from './style';

export default class MainComponent extends Component {
	render() {
		return (
			<Main>
				<SignUp/>
				<LogIn/>
			</Main>
		);
	}
}

