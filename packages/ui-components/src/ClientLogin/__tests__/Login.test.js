import Login from '../Login'
describe('LoginComponent', () => {
  let sShallow, mMount
  const formId = 'loginForm'
  const passwordId = '#password' + formId

  const textInputId = '#username' + formId

  const buttonId = '#f-submitter' + formId

  const menuId ="#forgot-password"+ formId
 
  const mockSubmit = jest.fn()

  beforeEach(() => {
    sShallow = shallow(<Login id={formId} onSubmitFormHandler={mockSubmit} />)
  })

  it('should be defined', () => {
    expect(sShallow).toBeDefined()
  })

  it('should have at least one Form element', () => {
    expect(sShallow.find('#' + formId)).toHaveLength(1)
  })

  it('should have only one text input element', () => {
    expect(sShallow.find('#username' + formId)).toHaveLength(1)
  })

  it('should have only one password input element', () => {
    expect(sShallow.find('#password' + formId)).toHaveLength(1)
  })

  it('should have only one Button element ', () => {
    expect(sShallow.find('#f-submitter' + formId)).toHaveLength(1)
  })

  it('should have the given props available to Text Field', () => {
    const textProps = [
      'id',
      'placeholder',
      'name',
      'type',
      'onChangeHandler',
      'value'
    ]
    const textInputProps = Object.keys(sShallow.find(textInputId).props())
    textProps.map((textProp, i) => {
      expect(textProps).toContain(textInputProps[i])
    })
  })

  it('should have the given props available for password field', () => {
    const passProps = ['id', 'placeholder', 'name', 'onChangeHandler', 'value']
    const passInputProps = Object.keys(sShallow.find(passwordId).props())
    passProps.map((passProp, i) => {
      expect(passProps).toContain(passInputProps[i])
    })
  })

  it('should have the given props available for button', () => {
    const buttonProps = ['id', 'type', 'buttonName', 'onClickHandler']
    const buttonInputProps = Object.keys(sShallow.find(buttonId).props())
    buttonProps.map((buttonProp, i) => {
      expect(buttonProps).toContain(buttonInputProps[i])
    })
  })

  it('should have state for all the input field', () => {
    const states = ['user', 'errorMsg', 'submitErrorMsg']
    const statesFromComp = Object.keys(sShallow.state())
    states.map((state, i) => {
      expect(states).toContain(statesFromComp[i])
    })
  })

  it('should have a function for changing inputs', () => {
    expect(sShallow.instance().onChangeHandler).toBeDefined()
  })

  it('should have submitFormHandler function', () => {
    expect(sShallow.instance().onSubmitFormHandler).toBeDefined();
  })

  it('should have one forgot password link', () => {
    expect(sShallow.find(menuId)).toHaveLength(1);
  })

  describe('Input Simulation Change', () => {
    it('should change the value of state of username when Text Input is changed', () => {
      sShallow
        .find(textInputId)
        .props()
        .onChangeHandler({
          target: {
            name: 'username',
            value: 'kaushal@gmail.com'
          }
        })
      expect(sShallow.state().user.username).toEqual('kaushal@gmail.com')
    })

    it('should change the value of state of password when Password Input is changed', () => {
      sShallow
        .find(passwordId)
        .props()
        .onChangeHandler({
          target: {
            name: 'password',
            value: '12345678'
          }
        })
      expect(sShallow.state().user.password).toEqual('12345678')
    })
  })
  describe('Form Submit Simulation', () => {
    let submitCallBack
    beforeEach(() => {
      submitCallBack = jest.spyOn(sShallow.instance(), 'onSubmitFormHandler')
      sShallow.instance().forceUpdate()
    })

    it('should submit the form and prevent reloading when form is submitted with non empty value', () => {
      sShallow
        .find(buttonId)
        .props()
        .onClickHandler({ preventDefault: () => {} })
      expect(submitCallBack).toHaveBeenCalled()
    })

    it('should not submit the form if all the value is not provided and provide errorMsg for form', () => {
      sShallow
        .find(buttonId)
        .props()
        .onClickHandler({ preventDefault: () => {} })
      const errorMsg = sShallow.state().errorMsg
      const { username, password } = errorMsg
      const flag = !!(username && password)
      expect(flag).toBeTruthy()
    })

    it('should submit the form if all the value is  provided and donot provide errorMsg for form', () => {
      sShallow.setState({
        user: {
          username: 'kaushal123',
          password: '12345678'
        }
      })
      sShallow
        .find(buttonId)
        .props()
        .onClickHandler({ preventDefault: () => {} })

      const errorMsg = sShallow.state().errorMsg
      const { username, password } = errorMsg
      const flag = !!(username && password)
      expect(flag).toBeFalsy()
    })
  })
})
