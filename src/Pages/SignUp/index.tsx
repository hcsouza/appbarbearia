import React, { useRef, useCallback } from 'react';
import { Alert, Image, View, ScrollView, KeyboardAvoidingView, Platform } from 'react-native';
import Icon from 'react-native-vector-icons/Feather';
import { useNavigation } from '@react-navigation/native';
import { Form } from '@unform/mobile';
import { FormHandles } from '@unform/core';
import * as Yup from 'yup';
import getValidationErrors from '../../utils/getValidationErrors';
import  api  from '../../services/api';

import Input from '../../components/Input';
import Button from '../../components/Button';

import logoImg from '../../assets/logo.png';
import {
          Container,
          Title,
          BackToSignIn,
          BackToSignInText
      } from './styles';


interface SignUpFormData {
  name: string,
  email: string;
  password: string;
}

const SignUp: React.FC = () => {
  const formRef = useRef<FormHandles>(null);
  const inputEmailRef = useRef(null);
  const inputPasswordRef = useRef(null);
  const navigation = useNavigation();

  const handleSignUp = useCallback( async (data: SignUpFormData) =>  {
    try {

      formRef.current?.setErrors({});

      const schema = Yup.object().shape({
        name: Yup.string().required('Nome é obrigatório'),
        email: Yup.string().required('E-mail é obrigatório').email('Digite um e-mail válido'),
        password: Yup.string().min(6, 'Necessário no mínimo 6 digitos'),
      });

      await schema.validate(data, {
        abortEarly: false,
      });

      api.post('/users', data);

      Alert.alert('Cadastro realizado.', 'Você já pode fazer seu logon no GoBarber');

      navigation.goBack();

    } catch (err) {
      if(err instanceof Yup.ValidationError) {
        const errors = getValidationErrors(err);
        formRef.current?.setErrors(errors);
        return;
      }

      Alert.alert('Erro no Cadastro', 'Ocorreu um erro ao fazer seu cadastro.');
    }

  }, [navigation])

  return (
    <>
      <KeyboardAvoidingView
        style={{ flex: 1 }}
        behavior={ Platform.OS === 'ios' ? 'padding' : undefined }
        enabled
      >
        <ScrollView keyboardShouldPersistTaps="handled" contentContainerStyle={{ flex: 1 }}>
          <Container >
            <Image source={logoImg} />
            <View>
              <Title>Crie sua conta</Title>
            </View>

            <Form ref={formRef} onSubmit={handleSignUp} >

              <Input name="name" icon="user" placeholder="Nome"
                autoCapitalize="none"
                autoCorrect={false}
                returnKeyType="next"
                onSubmitEditing={() => { inputEmailRef.current?.focus(); }}
              />

              <Input ref={inputEmailRef} name="email" icon="mail" placeholder="E-mail"
                keyboardType="email-address"
                autoCorrect={false}
                autoCapitalize="none"
                returnKeyType="next"
                onSubmitEditing={() => { inputPasswordRef.current?.focus(); }}
              />

              <Input ref={inputPasswordRef} name="password" icon="lock" placeholder="Senha"
                secureTextEntry
                returnKeyType="send"
                onSubmitEditing={() => { formRef.current?.submitForm(); }}
               />

              <Button onPress={ () => { formRef.current?.submitForm(); }}>Entrar</Button>

            </Form>

          </Container>
        </ScrollView>
      </KeyboardAvoidingView>

      <BackToSignIn onPress={ () => { navigation.goBack() }}>
        <Icon name="arrow-left" size={20} color="#fff" />
        <BackToSignInText>Voltar para login</BackToSignInText>
      </BackToSignIn>
    </>
  );
};

export default SignUp;