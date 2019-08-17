<template>
  <div id="all-background">
    <div class="login-layout">
      <div class="index-include" id="login" name="login">
        <div class="title">
          <img src="../assets/loginlogo.png" alt="智慧菜市云logo" style="margin: 0 auto;display: block;">
        </div>
        <el-form :model="ruleForm" :rules="rules" ref="ruleForm" class="demo-ruleForm login" >
          <el-form-item prop="username" >
            <el-input v-model="ruleForm.username" placeholder="用户名" class="flh" >
              <i slot="prefix" class="el-icon-user f-icon-size flh" ></i>
            </el-input>
          </el-form-item>
          <el-form-item prop="password" >
            <el-input v-model="ruleForm.password" placeholder="密码" class="flh" show-password>
              <i slot="prefix" class="el-icon-lock f-icon-size flh"></i>
            </el-input>
          </el-form-item >
          <el-button type="primary" class="click" @click="login('ruleForm')">登录</el-button>
          <div class="register">
            <router-link :to="{ name:'Index'}" @click.native="replace">游客登录</router-link>
          </div>
        </el-form>
      </div>
    </div>
  </div>

</template>

<script>
    export default {
      name: "Login",
      data(){
        var checkname = (rule, value, callback) => {
          var params = new URLSearchParams();
          params.append('username', this.ruleForm.username);
          params.append('password', this.ruleForm.password);
          this.$axios.post('/Checkuserservlet$ajax.htm', params)
            .then((res) => {
              if (res.data.msg == '成功') {
                callback();
              } else {
                callback(new Error('用户名或密码错误'));
              }
            })
            .catch((error) => {
              console.log(error);
            })
        };
          return{
            ruleForm:{
              username:'',
              password:''
            },
            rules:{
              username: [
                { required: true, message: '请输入用户名', trigger: 'blur' },
                { min: 2, message: '账号长度应大于2个字符', trigger: 'blur' },
                { validator: checkname, trigger:'blur,change'}
              ],
              password:[
                { required: true, message: '请输入密码', trigger: 'blur' },
                { min: 4, message: '密码长度不小于4个字符', trigger: 'blur'}
              ]
            }
          }
        },
      methods:{
        replace:function(){
          this.$store.commit('replace',{nickname:'游客',area:'青羊区',authority:4})
        },
        login:function (formdata) {
          this.$refs[formdata].validate((valid)=>{
            if (valid) {
              //get方式请求参数
              /*this.$axios.get('/Checkuserservlet$ajax.htm', {
                params:{
                  username:this.ruleForm.username,
                  password:this.ruleForm.password
                }
              })
                .then((res) => {
                  console.log(res.data.msg);
                })
                .catch((error) => {
                  console.log(error);
                })*/

              //post方式请求参数(vue中使用axios的一个坑)
              var params = new URLSearchParams();
              params.append('username', this.ruleForm.username);
              params.append('password', this.ruleForm.password);
              this.$axios.post('/Checkuserservlet$ajax.htm', params)
                .then((res) => {
                  if (res.data.msg == '成功') {
                    this.$router.push({name: 'Index'});
                    this.$store.commit('replace',{nickname:res.data.resultList[0].nickname,area:res.data.resultList[0].area,authority:res.data.resultList[0].authority})
                  } else {
                    //alert('用户名或密码错误')

                  }
                })
                .catch((error) => {
                  console.log(error);
                })
            }else{
              return false;
            }
          })
        }
      }
    }
</script>

<style scoped>
  #all-background{
    background: url('../assets/background.jpg');
    position: absolute;
    top: 0;
    left: 0;
    z-index: 1;
    background-size: cover;
    background-repeat: no-repeat;
    width: 100%;
    height: 900px;
  }
  .login-layout{
    width: 1200px;
    margin: 0 auto;
    overflow: hidden;
    position: relative;
    height: 900px;
    z-index: 999;
  }
  .index-include{
    width: 400px;
    height:480px;
    background: #FFFFFF;
    border: 1px solid #e8e8e8;
    z-index: 2000;
    display:block;
    position: absolute;
    top: 200px;
    right: 60px;

  }
  .title{
    width: 100%;
    height: auto;
    margin-top: 80px;
    margin-bottom: 30px;
  }
  .login{
    position: relative;
    margin: 10px 40px 0 40px;
    height: 45px;

  }
  .click{
    font-size: 22px;
    width: 100%;
    height: 60px;
  }
  .register{
    margin: 20px 0 10px 40px;
    height: 40px;
    text-align: right;
  }
  .register a{
    line-height: 40px;
    font-size: 14px;
  }
  .register a{
    text-decoration: none;
    color:rgb(51, 122, 183);
  }
  .register a:hover{
    color: #23527c;
  }
  .f-icon-size{
    font-size: 18px;
  }
  .flh /deep/ .el-input__inner{
    padding-left: 35px;
  }

</style>

