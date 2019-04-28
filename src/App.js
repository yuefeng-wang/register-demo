import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import "antd/dist/antd.css";
import { Row,Col,Input,Button } from 'antd';

class App extends Component {
    constructor(props){
        super(props);
        this.state = {
            user:'',//账号
            passWord:'',//密码
            confirmPass:'',//确认密码
            btnDisplay:'disabled',//注册按钮置灰
            errtext:'',//错误文本
        };
        this.doLogin = this.doLogin.bind(this);
        this.loginKeyUp = this.loginKeyUp.bind(this);
        this.clearErr = this.clearErr.bind(this);;
    }
    //输入值改变
    inputChange(e,key){
        this.setState({
            [key]: e.target.value
        });
    }
    //清除错误提示
    clearErr(){
        this.setState({
            errtext:''
        });
    }
    //回车时直接登录
    loginKeyUp(e) {
        if (e.keyCode === 13) {
                this.doLogin();
        }
    }
    //点击登录
    doLogin() {
        var passWord=this.state.passWord
        var confirmPass=this.state.confirmPass
        var user=this.state.user
        if (this.state.user != '' && this.state.passWord != '' && this.state.confirmPass != ''){
            var regx =/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[^]{6,16}$/;
            if(passWord.match(regx)==null){
                this.setState({
                    errtext: '请输入包含6位数大写字母小写字母和数字的密码'
                })
            }else{
                if(passWord!=confirmPass){
                    this.setState({
                        errtext: '请确认密码',
                    })
                }else{
                    this.setState({
                        errtext: '注册成功！'
                    })
                }
            }
        }else{
            this.setState({
                errtext: '请输入用户名，密码或者确认密码',
            })
        }
        }

  render() {
      if(this.state.user!=''&&this.state.passWord!=''&&this.state.confirmPass!=''){
          if(this.state.errtext!=''){
              this.state.btnDisplay='disabled'
          }else{
              this.state.btnDisplay=''
          }
      }else{
          this.state.btnDisplay='disabled'
      }
    return (
      <div className="App">
             <div className="registerForm">
                 <Row className="rowBlank">
                     <Col span={6}>用户名：</Col>
                     <Col span={18}>
                         <Input
                             value={this.state.user}
                             onChange={(e)=>this.inputChange(e,'user')}
                             onFocus={this.clearErr}
                             onKeyUp={this.loginKeyUp}/>
                     </Col>
                 </Row>
                 <Row className="rowBlank">
                     <Col span={6}>密码：</Col>
                     <Col span={18}>
                         <Input.Password
                             value={this.state.passWord}
                             onChange={(e)=>this.inputChange(e,'passWord')}
                             onFocus={this.clearErr}
                             onKeyUp={this.loginKeyUp}/>
                     </Col>
                 </Row>
                 <Row className="rowBlank">
                     <Col span={6}>确认密码：</Col>
                     <Col span={18}>
                         <Input.Password
                             value={this.state.confirmPass}
                             onChange={(e)=>this.inputChange(e,'confirmPass')}
                             onFocus={this.clearErr}
                             onKeyUp={this.loginKeyUp}/>
                     </Col>
                 </Row>
                 <Row className="rowBlank">
                     <div className="errLine">
                         {this.state.errtext}
                     </div>
                 </Row>
                 <Row className="rowBlank">
                     <Button type="primary" disabled={this.state.btnDisplay} onclick={this.doLogin}>注册</Button>
                 </Row>
             </div>
      </div>
    );
  }
}

export default App;
