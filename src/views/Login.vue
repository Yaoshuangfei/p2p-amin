<template>
    <div class="w1200">
        <div class="slogan">
            <p class="f22">青春很短，现在就攒</p>
            <p class="f46">妙银理财</p>
            <p class="f18">央企控股/银行存管/供应链金融/专业风控团队</p>
        </div>
        <el-form :model="ruleForm2" :rules="rules2" ref="ruleForm2" label-position="left" label-width="0px" class="demo-ruleForm login-container">
            <h3 class="title">登录后台管理系统</h3>
            <el-form-item prop="username">
                <el-input type="text" v-model="ruleForm2.username" @change="shouYz" auto-complete="off" @keyup.enter.native="keyLogin" placeholder="账号"></el-input>
            </el-form-item>
            <el-form-item prop="password">
                <el-input type="password" v-model="ruleForm2.password" auto-complete="off" @keyup.enter.native="keyLogin" placeholder="密码"></el-input>
            </el-form-item>
            <el-form-item v-show="captchaShow">
                <el-col :span='8' prop="yanzm">
                    <el-input v-model="ruleForm2.code" auto-complete="off" @keyup.enter.native="keyLogin" placeholder="验证码"></el-input>
                </el-col>
                <el-col :span='10'>
                    <el-button type="warning" style="width:100%;margin-left:10%;" @click.native.prevent="getCaptcha" :disabled="showBtn">发送验证码 {{miao}}</el-button>
                </el-col>
                <!-- <el-col :span='12'><img :src='imgsrc' @click="getuid"></el-col> -->
            </el-form-item>
            <!-- <el-checkbox v-model="checked" checked class="remember">记住密码</el-checkbox> -->
            <el-form-item style="width:100%;">
              <el-button type="primary" style="width:100%;" @click.native.prevent="logi"  :loading="logining">登录</el-button>
              <!-- <el-button type="warning" style="width:34%;" @click.native.prevent="reset">重置</el-button> -->
            </el-form-item>
      </el-form>
    </div>
</template>

<script>
    import { requestLogin ,loginID ,baseUrl } from '../api/api';
    import { state } from '../vuex/state'
    export default {
        data() {
            return {
                uuid: '',
                imgsrc: '',
                logining: false,
                ruleForm2: {
                    username: '',
                    password: '',
                    code:''
                },
                miao:'',
                showBtn:false,
                captchaShow:false,
                rules2: {
                    username: [
                        { required: true, message: '请输入账号', trigger: 'blur' },
                        //{ validator: validaePass }
                    ],
                    password: [
                        { required: true, message: '请输入密码', trigger: 'blur' },
                        //{ validator: validaePass2 }
                    ],
                    yanzm: [
                        { required: true, message: '请输入验证码', trigger: 'blur' },
                        //{ validator: validaePass2 }
                    ]
                },
                checked: true
            };
        },
        computed: {
            cShow:function(){
                if(this.ruleForm2.username === 'admin' || this.captchaShow === false){
                    return false
                }else{
                    return true
                }
            }
        },
        methods: {
            keyLogin(ev){
             if (ev.keyCode==13){
                 this.logi()
             }
            },
            reset(){
                this.ruleForm2={
                    username: '',
                    password: '',
                    code:''  
                }
            },
            shouYz(){
                if(this.ruleForm2.username === ''){
                    this.captchaShow = false
                }
            },
            getCaptcha(){
                const _this = this
                $.ajax({
                    type:'POST',
                    dataType:'json',
                    url:baseUrl+'/admin/getCaptcha/backgroundLoginCode?userName='+_this.ruleForm2.username,
                    data:"",
                    contentType:'application/json;charset=utf-8',
                    error: function (XMLHttpRequest, textStatus, errorThrown) {},
                    success:function(data){
                        if(data.code === 200){
                            _this.$message({
                              message: '获取成功，注意查收',
                              type: 'success',
                              duration:1000
                            });
                            _this.showBtn = true
                            let m = 60
                            const timer = setInterval(function(){
                                m -= 1
                                _this.miao = m
                                if(m === 0){//满足某个条件时 清除定时器
                                    clearInterval(timer);
                                    _this.showBtn = false
                                    _this.miao = ''
                                }
                            }, 1000)
                        }else{
                            _this.$message({
                              message: data.message,
                              type: 'error',
                              duration:1000
                            });
                        }
                    }
                });
            },
            logi() {
                const _this = this
                let params = {}
                if(this.captchaShow === true){
                    params = {
                        username:_this.ruleForm2.username,
                        password:_this.ruleForm2.password,
                        captcha:_this.ruleForm2.code
                    }
                }else{
                    params = {
                        username:_this.ruleForm2.username,
                        password:_this.ruleForm2.password
                    }
                }
                $.ajax({
                    type:'POST',
                    dataType:'json',
                    url:baseUrl+'/admin/sys/login',
                    data:JSON.stringify(params),
                    contentType:'application/json;charset=utf-8',
                    error: function (XMLHttpRequest, textStatus, errorThrown) {},
                    success:function(data){
                        if(data.code === 401){
                            _this.captchaShow = true
                            _this.$message({
                              message: data.message,
                              type: 'error',
                              duration:1000
                            });
                        }else if(data.code === 200){
                            _this.$message({
                              message: '登录成功',
                              type: 'success',
                              duration:1000
                            });
                            sessionStorage.setItem('user', JSON.stringify(_this.ruleForm2.username));
                            sessionStorage.setItem('token', JSON.stringify(data.data.token));
                            sessionStorage.setItem('type', JSON.stringify(data.data.type));
                            _this.$router.push({ path: '/StoreInformation' });
                        }else{
                            _this.$message({
                              message: data.message,
                              type: 'error',
                              duration:1000
                            });
                        }
                    }
                });
                // sessionStorage.setItem('user', JSON.stringify(_this.ruleForm2.username));
                            // _this.$router.push({ path: '/StoreInformation' });
            }
        },
        mounted() {

        },
    }

</script>

<style lang="scss" scoped>
    .w1200{
        width: 1200px;
        height: 100%;
        margin: 0 auto;
        position:relative;
        }
    .slogan{
        position:absolute;
        top:30%;
        left:0;
        color:#fff;
    }
    .slogan .f22{
        font-size:22px;
    }
    .slogan .f46{
        font-size:46px;
    }
    .slogan .f18{
        font-size:18px;
    }

  .login-container {
    /*box-shadow: 0 0px 8px 0 rgba(0, 0, 0, 0.06), 0 1px 0px 0 rgba(0, 0, 0, 0.02);*/
    -webkit-border-radius: 5px;
    border-radius: 5px;
    -moz-border-radius: 5px;
    background-clip: padding-box;
    position: absolute;
    width:270px;
    right: 0;
    top:25%;
    padding: 35px 35px 15px 35px;
    background: #fff;
    border: 1px solid #eaeaea;
    box-shadow: 0 0 25px #cac6c6;
    .title {
      margin: 0px auto 40px auto;
      text-align: center;
      color: #999;
    }
    .remember {
      margin: 0px 0px 35px 0px;
    }
    img{
      cursor:pointer;
    }
  }
</style>