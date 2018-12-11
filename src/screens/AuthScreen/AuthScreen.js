import React, { Component } from 'react';
import {
	View,
	Text,
	Button,
	TextInput,
	StyleSheet,
	ImageBackground,
	Dimensions,
	KeyboardAvoidingView,
	Keyboard,
	TouchableWithoutFeedback,
} from 'react-native';
import startMainTabs from './../MainTabs/startMainTabs.js';
import DefaultInput from './../../components/UI/DefaultInput/DefaultInput.js';
import HeadingText from './../../components/UI/HeadingText/HeadingText.js';
import MainText from './../../components/UI/MainText/MainText.js';
import ButtonWithBackground from './../../components/UI/ButtonWithBackground/ButtonWithBackground.js';
import backgroundImage from './../../assets/background.jpg';
import validate from './../../utility/validation.js';
import { connect } from 'react-redux';
import { authTry } from './../../store/actions/index.js';

class AuthScreen extends Component {
	state = {
		viewMode: Dimensions.get('window').height > 500 ? 'portrait' : 'landscape',
		authMode: 'login',
		controls: {
			email: {
				value: '',
				valid: false,
				validationRules: {
					isEmail: true,
				},
				touched: false,
			},
			password: {
				value: '',
				valid: false,
				validationRules: {
					minLength: 6,
				},
				touched: false,
			},
			confirmPassword: {
				value: '',
				valid: false,
				validationRules: {
					equalTo: 'password',
				},
				touched: false,
			},
		},
	};

	constructor(props) {
		super(props);
		Dimensions.addEventListener('change', this.updateStyles);
	}

	updateStyles = dimensions => {
		this.setState({
			viewMode: dimensions.window.height > 500 ? 'portrait' : 'landscape',
		});
	};

	componentWillUnmount() {
		Dimensions.removeEventListener('change', this.updateStyles);
	}

	handleSwitchAuth = () => {
		this.setState(prevState => {
			return {
				authMode: prevState.authMode === 'login' ? 'signup' : 'login',
			};
		});
	};

	handleLogin = () => {
		const authData = {
			email: this.state.controls.email.value,
			password: this.state.controls.password.value,
		};

		this.props.onAuthTry(authData);
		startMainTabs();
	};

	handleTextChange = (key, value) => {
		let connectedValue = {};

		if (this.state.controls[key].validationRules.equalTo) {
			const equalControl = this.state.controls[key].validationRules.equalTo;
			const equalValue = this.state.controls[equalControl].value;

			connectedValue = {
				...connectedValue,
				equalTo: equalValue,
			};
		}

		if (key === 'password') {
			connectedValue = {
				...connectedValue,
				equalTo: value,
			};
		}

		this.setState(prevState => {
			return {
				controls: {
					...prevState.controls,
					confirmPassword: {
						...prevState.controls.confirmPassword,
						valid:
							key === 'password'
								? validate(
										prevState.controls.confirmPassword.value,
										prevState.controls.confirmPassword.validationRules,
										connectedValue
								  )
								: prevState.controls.confirmPassword.valid,
					},
					[key]: {
						...prevState.controls[key],
						value: value,
						valid: validate(value, prevState.controls[key].validationRules, connectedValue),
						touched: true,
					},
				},
			};
		});
	};

	render() {
		let headingTextUI = null;
		let confirmPasswordControlUI = null;

		if (this.state.viewMode === 'portrait') {
			headingText = (
				<MainText>
					<HeadingText>Plase log in</HeadingText>
				</MainText>
			);
		}

		if (this.state.authMode === 'signup') {
			confirmPasswordControlUI = (
				<View
					style={this.state.viewMode === 'portrait' ? styles.portraitPasswordWrapper : styles.landscapePasswordWrapper}
				>
					<DefaultInput
						placeholder="Confirm password"
						style={styles.input}
						value={this.state.controls.confirmPassword.value}
						onChangeText={value => this.handleTextChange('confirmPassword', value)}
						valid={this.state.controls.confirmPassword.valid}
						touched={this.state.controls.confirmPassword.touched}
						secureTextEntry
					/>
				</View>
			);
		}

		return (
			<ImageBackground source={backgroundImage} style={styles.backgroundImage}>
				<TouchableWithoutFeedback onPress={Keyboard.dismiss}>
					<KeyboardAvoidingView style={styles.container} behaviour="padding">
						{headingTextUI}
						<ButtonWithBackground onPress={this.handleSwitchAuth} color="#29aaf4">
							Switch to {this.state.authMode === 'login' ? 'Sign up' : 'Login'}
						</ButtonWithBackground>
						<View style={styles.inputContainer}>
							<DefaultInput
								placeholder="Your e-mail address"
								style={styles.input}
								value={this.state.controls.email.value}
								onChangeText={value => this.handleTextChange('email', value)}
								valid={this.state.controls.email.valid}
								touched={this.state.controls.email.touched}
								autoCapitalize="none"
								autoCorrect={false}
								keyboardType="email-address"
							/>
							<View
								style={
									this.state.viewMode === 'portrait' || this.state.authMode === 'login'
										? styles.portraitPasswordContainer
										: styles.landscapePasswordContainer
								}
							>
								<View
									style={
										this.state.viewMode === 'portrait' || this.state.authMode === 'login'
											? styles.portraitPasswordWrapper
											: styles.landscapePasswordWrapper
									}
								>
									<DefaultInput
										placeholder="Password"
										style={styles.input}
										value={this.state.controls.password.value}
										onChangeText={value => this.handleTextChange('password', value)}
										valid={this.state.controls.password.valid}
										touched={this.state.controls.password.touched}
										secureTextEntry
									/>
								</View>
								{confirmPasswordControlUI}
							</View>
						</View>
						<ButtonWithBackground
							onPress={this.handleLogin}
							color="#29aaf4"
							disabled={
								(!this.state.controls.confirmPassword.valid && this.state.authMode === 'signup') ||
								(!this.state.controls.email.valid || !this.state.controls.password.valid)
							}
						>
							Submit
						</ButtonWithBackground>
					</KeyboardAvoidingView>
				</TouchableWithoutFeedback>
			</ImageBackground>
		);
	}
}

const styles = StyleSheet.create({
	container: {
		justifyContent: 'center',
		alignItems: 'center',
		flex: 1,
	},
	backgroundImage: {
		width: '100%',
		flex: 1,
	},
	inputContainer: {
		width: '80%',
	},
	input: {
		backgroundColor: '#eee',
		borderColor: '#bbb',
	},
	landscapePasswordContainer: {
		flexDirection: 'row',
		justifyContent: 'space-between',
	},
	portraitPasswordContainer: {
		flexDirection: 'column',
		justifyContent: 'flex-start',
	},
	landscapePasswordWrapper: {
		width: '48%',
	},
	portraitPasswordWrapper: {
		width: '100%',
	},
});

const mapDispatchToProps = dispatch => {
	return {
		onAuthTry: authData => dispatch(authTry(authData)),
	};
};

export default connect(
	null,
	mapDispatchToProps
)(AuthScreen);
