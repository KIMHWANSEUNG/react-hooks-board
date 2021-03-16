import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { withRouter } from 'react-router-dom';
import './resource/css/register.css';

function Register(props){
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [phoneNumber, setPhoneNumber] = useState("010");
    const [phoneNum1, setPhoneNum1] = useState("");
    const [phoneNum2, setPhoneNum2] = useState("");
    const [role, setRole] = useState("");
    const [password,setPassword]= useState("");

    const onNameHandler = (e) => {
        setName(e.currentTarget.value)
    }
    const onEmailHandler = (e) => {
        setEmail(e.currentTarget.value)
    }
    //핸드폰 번호 Select Box 
    const onPhoneNumber1 = (e) => {
        setPhoneNum1(e.target.value);
    }
    //핸드폰 번호 Input Box
    const onPhoneNumber2 = (e) => {
        setPhoneNum2(e.currentTarget.value)
    }
    const onRoleHandler = (e) => {
        setRole(e.currentTarget.value)
    }
    const onPasswordHandler = (e) => {
        setPassword(e.currentTarget.value)
    }

    const onSubmitHandler = (e) =>{
        axios.post("/register/do",{
            name:name,
            email:email,
            phone_number:phoneNumber,
            role:role,
            pw:password,

          }).then(function(response) {
              console.log(response.data);
              if("ConfirmRegist"==response.data){
                  window.location.href="/"
              }
          }).catch(function (error){
              console.log(error);
          });
    }
    const onEmailcheckHandler = (e) =>{
        axios.post("/register/emailCheck",{
            email:email,
          }).then(function(response) {
              console.log(response.data);
              if(response.data != ""){
                  alert("중복된 이메일입니다.")
              }else{
                  alert("사용 가능한 이메일입니다.")
              }
          }).catch(function (error){
              console.log(error);
          });
    }



    useEffect(() => {
        //Select Box는 이렇게 useEffect를 사용해야한다. 
        //초기값 설정
        if(phoneNum1==""){
            setPhoneNum1("010");
        }
        setPhoneNumber(phoneNum1+phoneNum2);
        setRole(document.getElementById("role").value);
            
    });

  return (
    <>
        <link href="//maxcdn.bootstrapcdn.com/bootstrap/4.0.0/css/bootstrap.min.css" rel="stylesheet" id="bootstrap-css"/>
        <script src="//maxcdn.bootstrapcdn.com/bootstrap/4.0.0/js/bootstrap.min.js"></script>
                    <div class="container">
                        <div class="card bg-light">
                            <article class="card-body mx-auto">
                                <h4 class="card-title mt-3 text-center">회원 가입</h4>
                             
                                    <div class="form-group input-group">
                                        <div class="input-group-prepend">
                                            <span class="input-group-text"> <i class="fa fa-user"></i> </span>
                                        </div>
                                        <input onChange={onNameHandler} id="name" class="form-control" placeholder="이름" type="text"/>
                                    </div> 
                                    <div class="form-group input-group">
                                        <div class="input-group-prepend">
                                            <span class="input-group-text"> <i class="fa fa-envelope"></i> </span>
                                        </div>
                                        <input onChange={onEmailHandler} id="email" class="form-control" placeholder="이메일" type="email"/>
                                        <button onClick={onEmailcheckHandler} id="emailCheck">중복 확인</button>
                                    </div> 
                                    <div class="form-group input-group">
                                        <div class="input-group-prepend">
                                            <span class="input-group-text"> <i class="fa fa-phone"></i> </span>
                                        </div>
                                        <select value={phoneNum1} onChange={onPhoneNumber1} id="phone_number1" class="custom-select">
                                            <option selected="" value="010">010</option>
                                            <option value="011">011</option>
                                            <option value="012">012</option>
                                            <option value="013">013</option>
                                        </select>
                                        <input onChange={onPhoneNumber2} id="phone_number2" class="form-control" placeholder="휴대폰 번호" type="text"/>
                                    </div> 
                                    <div class="form-group input-group">
                                        <div class="input-group-prepend">
                                            <span class="input-group-text"> <i class="fa fa-building"></i> </span>
                                        </div>
                                        <select onChange={onRoleHandler} id="role" class="form-control">
                                            <option selected=""> 사용자 유형</option>
                                            <option value="user">일반사용자</option>
                                            <option value="admin">관리자</option>
                                        </select>
                                    </div> 
                                    <div class="form-group input-group">
                                        <div class="input-group-prepend">
                                            <span class="input-group-text"> <i class="fa fa-lock"></i> </span>
                                        </div>
                                        <input onChange={onPasswordHandler} id="pwd" class="form-control" placeholder="비밀번호" type="password"/>
                                    </div> 
                                    <div class="form-group input-group">
                                        <div class="input-group-prepend">
                                            <span class="input-group-text"> <i class="fa fa-lock"></i> </span>
                                        </div>
                                        <input class="form-control" placeholder="비밀번호 확인" type="password"/>
                                    </div> 
                                    <div class="form-group">
                                        <button onClick={onSubmitHandler} id="register"  class="btn btn-primary btn-block"> 회원 가입 </button>
                                    </div>
                                    <p class="text-center">계정이 있으신가요? <a href="/">로그인</a> </p>
                             
                            </article>
                        </div>
                    </div>
                <br/><br/>
                <article class="bg-secondary mb-3">
                    <div class="card-body text-center">
                        <h3 class="text-white mt-3">Bespin Global</h3>
                        <p class="h5 text-white">DevOps 1팀 신입사원 OJT </p>   <br/>
                        <p><a class="btn btn-warning" target="_blank" href="https://www.bespinglobal.com/?gclid=Cj0KCQiA6t6ABhDMARIsAONIYyyatC3K5DkILoLkuotn9-gedaTfTSfpdV5yqGFlwaq_6AnsiyZskp8aAsMcEALw_wcB"> BespinGlobal.com
                            <i class="fa fa-window-restore "></i></a></p>
                    </div>
                    <br/><br/>
                </article>
                    </>
 ) 
}

export default Register;