import React, {PureComponent} from 'react'
import {CButtonInput, CMessage, CPasswordInput, CTextInput} from '@frontend-appointment/ui-elements'
import {Form, Grid, Image, Menu} from 'semantic-ui-react'
import logo from './images/logo-small-0063FF.png'
import './login.css';
import profile from './profile';
import {usermenufilter} from './usermenusfilters';

class Login extends PureComponent {
    state = {
        user: {username: '', password: ''},
        errorMsg: {username: '', password: ''},
        formStatus: true,
        submitErrorMsg: '',
        userMenus: [],
    };

    setTheState = (name, value) => {
        let other = true;
        let user = {...this.state.user};
        if (Object.keys(user).includes(name)) {
            user[name] = value;
            other = false
        }
        !other
            ? this.setState(prevState => ({
                user
            }))
            : this.setState(prevState => ({
                [name]: value
            }))
    };

    setFormStatus = status => {
        this.setState({formStatus: status})
    };

    getFormErrorMessage = () => {
        let messages = Object.values(this.state.errorMsg)
        return messages[0].concat(messages[1]);
    };

    checkFormSubmitIsValid = () => {
        let errorMsg = {username: '', password: ''}
        let formStatus = true
        Object.keys(this.state['user']).map((s, i) => {
            if (!Object.values(this.state['user'])[i]) {
                errorMsg[s] = ` ${s.toUpperCase()} should not be empty`;
                formStatus = false
            } else {
                const patt = /^[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,4}$/;
                const value = Object.values(this.state['user'])[i];
                if (s === 'password' && value.length <= 4) {
                    errorMsg[
                        s
                        ] = `${s.toUpperCase()} length should be equal or greater than 6`;
                    formStatus = false
                } else if (
                    s === 'username' &&
                    value.includes('@') &&
                    !value.match(patt)
                ) {
                    errorMsg[s] = `Not a valid ${s.toUpperCase()}/EMAIL `;
                    formStatus = false
                }
            }
            return '';
        });
        this.setFormStatus(formStatus);
        this.setTheState('errorMsg', errorMsg);
        return formStatus
    };

    onChangeHandler = e => {
        const {name, value} = e.target;
        this.setTheState(name, value)
    };

    setErrorMessage = submitErrorMsg => {
        submitErrorMsg
            ? this.setState({submitErrorMsg})
            : this.setState({submitErrorMsg: ''})
    };

    onSubmitFormHandler = async e => {
        e.preventDefault();
         usermenufilter(this.state.userMenus);
        this.setState({submitErrorMsg: ''});
        let isFormValid = this.checkFormSubmitIsValid();
        let submitErrorMsg = ''
        if (isFormValid) {
            submitErrorMsg = await this.props.onSubmitHandler(this.state.user);
            if(submitErrorMsg)
              this.setErrorMessage(submitErrorMsg);
        }
    };

    render() {
        //console.log(this.state.submitErrorMsg)

        return (
            <>
                <div className='header-login'>
                    <div className='inner-header flex'>
                        <Grid celled='internally' className='container-login' centered>
                            <Grid.Row>
                                <Grid.Column width={8} className='login-right'>
                                    <div className='login-form'>
                                        <Image src={logo} className='logo-image' centered/>
                                        <h2 style={{color: '#444444', textAlign: 'center'}}>
                                            cogentEMR
                                        </h2>
                                        <Form id={this.props.id} error={!this.state.formStatus}>
                                            <Form.Field>
                                                <CTextInput
                                                    placeholder='Username/Email'
                                                    name='username'
                                                    type='text'
                                                    id={'username ' + this.props.id}
                                                    icon='user'
                                                    iconPosition='left'
                                                    onChangeHandler={this.onChangeHandler}
                                                    value={this.state.user.username}
                                                    fluid
                                                    // error={!!this.state.errorMsg.username}
                                                />
                                            </Form.Field>
                                            <Form.Field>
                                                <CPasswordInput
                                                    placeholder='Password'
                                                    name='password'
                                                    icon='lock'
                                                    iconPosition='left'
                                                    onChangeHandler={this.onChangeHandler}
                                                    value={this.state.user.password}
                                                    id={'password ' + this.props.id}
                                                    fluid
                                                    // error={!!this.state.errorMsg.password}
                                                />
                                                <div>
                                                    <CMessage
                                                        id='error-message'
                                                        error
                                                        onDismiss={() => {
                                                            this.setState({formStatus: true})
                                                        }}
                                                        children={<p>{this.getFormErrorMessage()}</p>}
                                                    />
                                                </div>

                                                {this.state.formStatus && this.state.submitErrorMsg ? (
                                                    <CMessage
                                                        id='submit-message'
                                                        negative
                                                        onDismiss={() => {
                                                            this.setState({
                                                                formStatus: true,
                                                                submitErrorMsg: ''
                                                            })
                                                        }}
                                                    >
                                                        <p className='error'>{this.state.submitErrorMsg}</p>
                                                    </CMessage>
                                                ) : null}
                                            </Form.Field>
                                            <Form.Field>
                                                <Menu.Item
                                                    id={'forgot-password ' + this.props.id}
                                                    as={() => <a href='#/forgotPassword'>Forgot Password? </a>}
                                                    content='Forgot Password?'
                                                />
                                            </Form.Field>
                                            <CButtonInput
                                                id={'f-submitter ' + this.props.id}
                                                type='submit'
                                                content='Submit'
                                                classes='primary'
                                                onClickHandler={this.onSubmitFormHandler}
                                                fluid
                                            />
                                        </Form>
                                    </div>
                                </Grid.Column>
                            </Grid.Row>
                        </Grid>
                    </div>

                    <div>
                        <svg
                            className='waves'
                            xmlns='http://www.w3.org/2000/svg'
                            xmlnsXlink='http://www.w3.org/1999/xlink'
                            viewBox='0 24 150 28'
                            preserveAspectRatio='none'
                            shapeRendering='auto'
                        >
                            <defs>
                                <path
                                    id='gentle-wave'
                                    d='M-160 44c30 0 58-18 88-18s 58 18 88 18 58-18 88-18 58 18 88 18 v44h-352z'
                                />
                            </defs>
                            <g className='parallax'>
                                <use
                                    xlinkHref='#gentle-wave'
                                    x='48'
                                    y='0'
                                    fill='rgba(255,255,255,0.7'
                                />
                                <use
                                    xlinkHref='#gentle-wave'
                                    x='48'
                                    y='3'
                                    fill='rgba(255,255,255,0.5)'
                                />
                                <use
                                    xlinkHref='#gentle-wave'
                                    x='48'
                                    y='5'
                                    fill='rgba(255,255,255,0.3)'
                                />
                                <use xlinkHref='#gentle-wave' x='48' y='7' fill='#fff'/>
                            </g>
                        </svg>
                    </div>
                </div>

                <div className='content-login flex'>
                    {/* <img src={logo} className="company-logo" /> */}
                    <p>Powered by Cogent Health (P) Ltd</p>
                </div>
            </>
        )
    }
}

export default Login
