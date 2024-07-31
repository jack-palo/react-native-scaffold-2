import React, { useState } from 'react'
import { Button, Text, TextInput, View } from 'react-native'

const Register: React.FC = () => {
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')

  const handleUsernameChange = (text: string) => {
    setUsername(text)
  }

  const handlePasswordChange = (text: string) => {
    setPassword(text)
  }

  const handleSubmit = () => {
    // Add your registration logic here
    console.log('Registering user:', username)
    console.log('Password:', password)
  }

  return (
    <View>
      <Text>Register</Text>
      <TextInput
        placeholder="Username"
        value={username}
        onChangeText={handleUsernameChange}
      />
      <TextInput
        placeholder="Password"
        secureTextEntry
        value={password}
        onChangeText={handlePasswordChange}
      />
      <Button title="Register" onPress={handleSubmit} />
    </View>
  )
}

export default Register
