<template>
	<section>
		<el-col  :xs="24" :sm="24" :md="24" :lg="24" style="margin:20px auto;margin-left: 18%;color: #20a0ff;font-size: 16px;">添加管理员</el-col>
		<el-col :offset="1" :xs="10" :sm="10" :md="10" :lg="10" style="margin-top: 20px;">
				<el-form label-width="150px" :rules="rules2" ref="ruleForm2" :model="ruleForm2">
					<el-form-item label="管理员账号：" :style="{ color: activeColor}">
						<el-input v-model="username" style="width: 260px;" type="text" @blur="queryByName"></el-input> {{usernameOk}}
					</el-form-item>
                    <el-form-item label="email">
                        <el-input v-model="email" style="width: 260px;" type="text"></el-input> 
                    </el-form-item>
                    <el-form-item label="手机号：" prop="mobile">
                        <el-input v-model="ruleForm2.mobile" style="width: 260px;" :maxlength="11" type="text"></el-input> 
                    </el-form-item>
                    <el-form-item label="密码：">
                        <el-input v-model="password" style="width: 260px;" type="text"></el-input> 
                    </el-form-item>
                    <el-form-item label="管理员类型">
                        <el-select v-model="type" clearable>
                          <el-option v-for="item in types" :label="item.name" :value="item.id">
                          </el-option>
                        </el-select>
                    </el-form-item>
                    <el-form-item label="角色列表：">
                        <el-checkbox-group v-model="checkedCities" @change="handleCheckedCitiesChange">
                            <el-checkbox v-for="city in cities" :label="city.id" :key="city.id">{{city.label}}</el-checkbox>
                        </el-checkbox-group> 
                    </el-form-item>
                    <el-form-item label="备注：">
                        <el-input v-model="remark" style="width: 260px;" type="text"></el-input> 
                    </el-form-item>
				<el-col :span='24' style="margin-left:250px;">
					<el-button type="primary" @click.native="sysSubmit" :loading="editLoading">点击提交</el-button>
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
            var validatePass = (rule, value, callback) => {
                var reg= /^((0\d{2,3}-\d{7,8})|(1[3584]\d{9}))$/;   /*定义验证表达式*/
                if (reg.test(value)) {
                    callback();
                } else {
                    callback(new Error('请输入正确的手机号！'));
                }
              };
			return {
                activeColor:'red',
                token:'',
                usernameOk:'',
                username:'',
                password:'',
                email:'',
                type:'',
                roleType:'',
                mobile:'',
				editLoading: false,
                checkedCities:[],
                cities:[],
                ruleForm2:{
                    mobile:''
                },
                rules2: {
                  mobile: [
                    { validator: validatePass, trigger: 'blur' }
                  ]
                },
                types:[{
                    id:'-2',
                    name:'超级管理员'
                },{
                    id:'-1',
                    name:'管理员'
                },{
                    id:'0',
                    name:'普通人员'
                },{
                    id:'1',
                    name:'访客'
                }],
                remark:''
			}
		},
		methods: {
            getlist(){
                const _this = this;
                $.ajax({
                    type:'GET',
                    dataType:'json',
                    url:baseUrl+'/sys/role/list?token='+_this.token+'&LoginType='+_this.roleType,
                    // data:JSON.stringify(params),
                    contentType:'application/json;charset=utf-8',
                    error: function (XMLHttpRequest, textStatus, errorThrown) {},
                    success:function(data){
                        if(data.code === 200){
                            const list = data.page.list
                            _this.cities = []
                            for (var i = 0; i < list.length; i++) {
                                const obj = {}
                                obj.id = list[i].roleId
                                obj.label = list[i].roleName
                                _this.cities.push(obj)
                            }
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
                              type: 'error'
                            });
                        }
                    }
                });
            },
            queryByName(){
                const _this = this;
                $.ajax({
                    type:'POST',
                    dataType:'json',
                    url:baseUrl+'/sys/user/queryByName?token='+_this.token+'&username='+_this.username,
                    // data:JSON.stringify(params),
                    contentType:'application/json;charset=utf-8',
                    error: function (XMLHttpRequest, textStatus, errorThrown) {},
                    success:function(data){
                        if(data.code === 200){
                            _this.activeColor = '#00ec00'
                            _this.usernameOk = data.message
                        }else if(data.code === 403){
                            _this.$message({
                              message: data.message,
                              type: 'error',
                              duration:1000
                            });
                            _this.$router.push({ path: '/login' });
                        }else{
                            _this.usernameOk = data.message
                            _this.activeColor = 'red'
                        }
                    }
                });
            },
            handleCheckedCitiesChange(value){
                // console.log(value)
                // console.log(this.checkedCities)
            },
            sysSubmit(){
                const _this = this
                let url = baseUrl+'/sys/user/save?token='+_this.token;
                const params = {
                    username:_this.username,
                    password:_this.password,
                    email:_this.email,
                    mobile:_this.ruleForm2.mobile,
                    roleIdList:_this.checkedCities,
                    type:_this.type,
                    LoginType:_this.roleType,
                    remark:_this.remark
                }
                if(_this.ruleForm2.mobile === ''){
                    _this.$message({
                      message: '手机号必填',
                      type: 'error',
                      duration:1000
                    });
                }else if(_this.checkedCities.length === 0){
                    _this.$message({
                      message: '角色列表必填',
                      type: 'error',
                      duration:1000
                    });
                }else if(_this.type === ''){
                    _this.$message({
                      message: '管理员类型必填',
                      type: 'error',
                      duration:1000
                    });
                }else{
                    $.ajax({
                        type:'POST',
                        dataType:'json',
                        url:url,
                        data:JSON.stringify(params),
                        contentType:'application/json;charset=utf-8',
                        error: function (XMLHttpRequest, textStatus, errorThrown) {},
                        success:function(data){
                            if(data.code === 200){
                                _this.$message({
                                  message: '添加成功',
                                  type: 'success',
                                  duration:1000
                                });
                                _this.$router.push({ path: '/adminList' });
                                for (var i = 0; i < state.tagArry.length; i++) {
                                    if(state.tagArry[i].path === '管理员列表'){
                                        state.id = i
                                        break;
                                    }
                                }
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
            this.roleType = sessionStorage.getItem('type')
            this.roleType = JSON.parse(this.roleType)
            this.getlist()
		}
	}
</script>

<style>

</style>