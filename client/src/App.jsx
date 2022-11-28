import './App.css'
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as yup from 'yup';
import Axios from 'axios';

function App() {

  const handleClickLogin = (values) => {
    Axios.post('http://localhost:8080/login', {
      email: values.email,
      senha: values.senha
    }).then((res) => {
      alert(res.data.msg)
    })
  };

  const handleClickCadastro = (values) => {
    Axios.post('http://localhost:8080/cad', {
      email: values.email,
      senha: values.senha
    }).then((res) => {
      alert(res.data.msg)
    });
  };


  const validationLogin = yup.object().shape({
    email: yup.string().email().required('Este campo é obrigatório'),
    senha: yup.string().min(8).required('Este campo é obrigatório'),
  });


  const validationCadastro = yup.object().shape({
    email: yup.string().email().required('Este campo é obrigatório'),
    senha: yup.string().min(8).required('Este campo é obrigatório'),
    confirmSenha: yup.string().oneOf([yup.ref('senha'), null], 'As senhas não são iguais'),
  });

  return (
    <div className='container'>
      <h1>Login</h1>

      <Formik
        initialValues={{}}
        onSubmit={handleClickLogin}
        validationSchema={validationLogin}
      >
        <Form className='login-form'>
          <div className='login-form-group'>
            <Field name='email' className='form-field' placeholder='Email' />

            <ErrorMessage component='span' name='email' className='form-error' />
          </div>

          <div className='login-form-group'>
            <Field name='senha' className='form-field' placeholder='Senha' />

            <ErrorMessage component='span' name='senha' className='form-error' />
          </div>

          <button className='button' type='submit'>Login</button>
        </Form>
      </Formik>

      <h1>Cadastro</h1>

      <Formik
        initialValues={{}}
        onSubmit={handleClickCadastro}
        validationSchema={validationCadastro}
      >
        <Form className='login-form'>
          <div className='login-form-group'>
            <Field name='email' className='form-field' placeholder='Email' />

            <ErrorMessage component='span' name='email' className='form-error' />
          </div>

          <div className='login-form-group'>
            <Field name='senha' className='form-field' placeholder='Senha' />

            <ErrorMessage component='span' name='senha' className='form-error' />
          </div>

          <div className='login-form-group'>
            <Field name='confirmSenha' className='form-field' placeholder='Confirme sua Senha' />

            <ErrorMessage component='span' name='confirmSenha' className='form-error' />
          </div>

          <button className='button' type='submit'>Cadastrar</button>
        </Form>
      </Formik>
    </div>
  )
}
export default App;
