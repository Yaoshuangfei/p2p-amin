<template>
    <section>
        <el-col  :xs="24" :sm="24" :md="24" :lg="24" style="margin:20px auto;margin-left: 18%;color: #20a0ff;font-size: 16px;">添加黑名单</el-col>
        <el-col :offset="1" :xs="10" :sm="10" :md="10" :lg="10" style="margin-top: 20px;">
                <el-form label-width="150px">
                    <el-form-item label="用户名：">
                        <el-input v-model="username" style="width: 260px;" type="text" :maxlength="11" placeholder="请输入11位正确的手机号码"></el-input>
                    </el-form-item>
                    <!-- <el-col :offset="5" style="margin-bottom: 10px;color: red;" v-show="showname">{{realname}}</el-col> -->
                    <!-- <el-col :offset="5" style="margin-bottom: 10px;color: red;" v-show="showuser">{{realname}}</el-col> -->
                    <el-form-item label="IP：">
                        <el-input v-model="ip" style="width: 260px;" type="text"></el-input>
                    </el-form-item>
                    <el-form-item label="备注：">
                        <el-input v-model="reason" style="width: 260px;" :rows="4" type="textarea"></el-input> 
                    </el-form-item>
                <el-col :span='24' style="margin-left:250px;">
                    <el-button type="primary" @click.native="submitUpload">提交</el-button>
                </el-col>
                </el-form>
            </el-col>
    </section>
</template>

<script>
    import { state } from '../../vuex/state'
    import util from '../../common/js/util'
    import {baseUrl , editUser, addUser } from '../../api/api';
    export default {
        data() {
            return {
                username:'',
                ip:'',
                reason:'',
                token:'',
                realname:'',
                showname:false,
                showuser:false
            }
        },
        methods: {
            realName(){
                const _this = this
                if(_this.username.length === 11){
                    $.ajax({
                        type:'POST',
                        dataType:'json',
                        url:baseUrl+'/pay/payrechargerecord/realNameByUsername?token='+_this.token +'&username='+_this.username,
                        data:"",
                        contentType:'application/json;charset=utf-8',
                        error: function (XMLHttpRequest, textStatus, errorThrown) {},
                        success:function(data){
                            if(data.code === 200 && data.data !== null && data.data !== ''){
                                _this.realname = data.message
                                if(_this.realname === '' || _this.realname === undefined){
                                    _this.showname = false
                                }else{
                                    _this.showname = true
                                }
                            }else{

                                _this.realname = data.message
                                _this.showuser = true
                                _this.showname = false
                            }
                        }
                    });
                }else{
                    _this.showuser = false
                    _this.showname = false
                }
            },
            submitUpload(){
                const _this = this
                if(_this.reason === '' || _this.username === ''){
                    _this.$message({
                        message:'用户名和备注必传',
                        type: 'error',
                        duration:1000
                    });
                }else{

                    $.ajax({
                        type:'POST',
                        dataType:'json',
                        url:baseUrl+'/pro/sysblacklist/addBlackList?token='+_this.token +'&username='+_this.username +'&reason='+_this.reason,
                        data:"",
                        contentType:'application/json;charset=utf-8',
                        error: function (XMLHttpRequest, textStatus, errorThrown) {},
                        success:function(data){
                            if(data.code === 200){
                                _this.$message({
                                    message: data.message,
                                    type: 'success',
                                    duration:1000
                                });
                                _this.$router.push({ path: '/blacklist_blacklistList' });
                            }else if(data.code === 403){
                                _this.$message({
                                    message: data.message,
                                    type: 'error',
                                    duration:1000
                                });
                                _this.$router.push({ path: '/login' });
                            }else{
                                _this.$message({
                                    message: data.message,
                                    type: 'error',
                                    duration:1000
                                });
                            }
                        }
                    });
                }
            }
        },
        mounted() {
            this.token = sessionStorage.getItem('token')
            this.token = JSON.parse(this.token)
        }
    }
</script>

<style>

</style>