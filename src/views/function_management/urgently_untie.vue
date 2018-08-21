<template>
	<section>
         <el-form label-width="150px" style="margin-top: 50px;">
			<el-form-item label="用户名：">
				<el-input v-model="phone" style="width: 260px;" @change="usnaInfo"  :maxlength="11" placeholder="请输入11位正确的手机号码" type="text"></el-input> 
			</el-form-item>
			<el-form-item label="用户名：" v-show="infoShow">
				<el-col style="width: 260px;">{{username}}</el-col> 
			</el-form-item>
			<el-form-item label="银行卡尾号(4位)：" v-show="infoShow">
				<el-col style="width: 260px;">{{bankAccountLast4Num}}</el-col> 
			</el-form-item>
			<el-form-item label="真实姓名：" v-show="infoShow">
				<el-col style="width: 260px;">{{bankAccountName}}</el-col> 
			</el-form-item>
			<el-form-item label="银行名称：" v-show="infoShow">
				<el-col style="width: 260px;">{{bankName}}</el-col> 
			</el-form-item>
		<el-col :span='24' style="margin-left:250px;">
			<el-button type="primary" @click.native="unbading" :loading="editLoading">解绑</el-button>
		</el-col>
	    </el-form>
	</section>
</template>	

<script>
	import { state } from '../../vuex/state'
	import util from '../../common/js/util'
	import {baseUrl , editUser, addUser } from '../../api/api';

	export default {
		data() {
			return {
				editLoading:false,
				infoShow:false,
				phone:'',
				username:'',
				bankAccountLast4Num:'',
				bankAccountName:'',
				bankName:'',
				token:'',
                total:0,
                page:1
			}
		},
        computed: {

        },
		methods: {
			unbading(){
                this.$confirm('确认解绑该用户银行卡?', '提示', {
                }).then(() => {
    				const _this = this
    				$.ajax({
                        type:'POST',
                        dataType:'json',
                        url:baseUrl+'/admin/userCardManage/urgencyUnBindUserCardFunction?token='+_this.token +'&username='+_this.phone,
                        // data:"",
                        contentType:'application/json;charset=utf-8',
                        error: function (XMLHttpRequest, textStatus, errorThrown) {},
                        success:function(data){
                            if(data.code === 200){
                            	_this.infoShow = false
                                _this.$message({
                                    message: data.message,
                                    type: 'success',
                                    duration:1000
                                });
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
                }).catch(() => {

                });
			},
			usnaInfo(){
				if(this.phone.length === 11){
					const _this = this
					$.ajax({
                        type:'GET',
                        dataType:'json',
                        url:baseUrl+'/admin/userCardManage/userCardManageMessage?token='+_this.token +'&username='+_this.phone,
                        data:"",
                        contentType:'application/json;charset=utf-8',
                        error: function (XMLHttpRequest, textStatus, errorThrown) {},
                        success:function(data){
                            if(data.code === 200){
                            	_this.username = data.data.username
                            	_this.bankAccountLast4Num = data.data.bankAccountLast4Num
                            	_this.bankAccountName = data.data.bankAccountName
                            	_this.bankName = data.data.bankName
                            	_this.infoShow = true
                                _this.$message({
                                    message: data.message,
                                    type: 'success',
                                    duration:1000
                                });
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