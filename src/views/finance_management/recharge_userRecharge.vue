<template>
	<section>
		<el-col  :xs="24" :sm="24" :md="24" :lg="24" style="margin:20px auto;margin-left: 18%;color: #20a0ff;font-size: 16px;">用户充值</el-col>
		<el-col :offset="1" :xs="10" :sm="10" :md="10" :lg="10" style="margin-top: 20px;">
				<el-form label-width="150px">
					<el-form-item label="用户名：">
						<el-input v-model="username" @change="realName" style="width: 260px;" type="text"></el-input>
					</el-form-item>
					<el-col :offset="5" style="margin-bottom: 10px;color: red;" v-show="showname">该用户真实姓名为：{{realname}}</el-col>
					<el-col :offset="5" style="margin-bottom: 10px;color: red;" v-show="showuser">该用户不存在</el-col>
					<el-form-item label="充值金额：">
						<el-input v-model="money" style="width: 260px;" type="text"></el-input> 
					</el-form-item>
					<el-form-item label="备注：">
						<el-input v-model="remark" style="width: 260px;" type="text"></el-input> 
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
				money:'',
                remark: '',
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
		                    	_this.realname = data.data
		                    	if(_this.realname === '' || _this.realname === undefined){
									_this.showname = false
								}else{
									_this.showname = true
								}
	                    	}else{
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
				$.ajax({
                    type:'POST',
                    dataType:'json',
                    url:baseUrl+'/pay/payrechargerecord/handRecharge?token='+_this.token +'&username='+_this.username +'&money='+_this.money +'&remark='+_this.remark,
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
                            for (var i = 0; i < state.tagArry.length; i++) {
                            	if(state.tagArry[i].path === '充值记录'){
									state.id = i
									break;
								}
                            }
                            _this.$router.push({ path: '/recharge_rechargeRecord' });
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
		},
		mounted() {
			this.token = sessionStorage.getItem('token')
            this.token = JSON.parse(this.token)
		}
	}
</script>

<style>

</style>