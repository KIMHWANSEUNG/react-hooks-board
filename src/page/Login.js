import axios from 'axios';
import React, { useState } from 'react';
import { withRouter } from 'react-router-dom';

function Login(props) {
    const [email, setEmail] = useState("");
    const [password,setPassword]=useState("");

    const onEmailHandler = (e) => {
        setEmail(e.currentTarget.value)
    }
    const onPasswordHandler = (e) => {
        setPassword(e.currentTarget.value)
    }

    const onSubmitHandler = (e) =>{
        axios.post("/login/do",{
              email:email,
              pw:password
            }).then(function(response) {
                if("canLogin"==response.data)
                {
                    window.location.href="/board";
                }else{
                    alert("회원 정보가 일치하지 않습니다.")
                }
            
            }).catch(function (error){
                console.log(error);
            });
    }

  return (
    <>
    <link href="//maxcdn.bootstrapcdn.com/bootstrap/4.1.1/css/bootstrap.min.css" rel="stylesheet" id="bootstrap-css"/>
    <script src="//maxcdn.bootstrapcdn.com/bootstrap/4.1.1/js/bootstrap.min.js"></script>
    <div id="login">
        <h3 class="text-center text-white pt-5">로그인</h3>
        <div class="container">
            <div id="login-row" class="row justify-content-center align-items-center">
                <div id="login-column" class="col-md-6">
                    <div id="login-box" class="col-md-12">
                       
                            <h3 class="text-center text-info">Login</h3>
                            <div class="form-group">
                                <label for="email" class="text-info">email:</label><br/>
                                <input onChange={onEmailHandler} type="text" name="email" id="email" class="form-control"/>
                            </div>
                            <div class="form-group">
                                <label for="password" class="text-info">Password:</label><br/>
                                <input onChange={onPasswordHandler} type="text" name="password" id="password" class="form-control"/>
                            </div>
                            <div class="form-group">
                                <button onClick={onSubmitHandler}  class="btn btn-info bd" > 로그인 </button>
                            </div>
                            <div id="register-link" class="text-right">
                                <a href="/register" class="text-info">회원가입 여기</a>
                            </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
      
    </>
  )
}

export default Login;