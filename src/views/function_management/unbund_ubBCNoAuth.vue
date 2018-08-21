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
			<el-form-item label="相关资料：" prop="title" v-show="infoShow">
				<input type="file" style="position:absolute;opacity:0;width:70px;height:30px;margin-right:10px" multiple="multiple"  @change="upload" id="fileInput">
				<button type="button" class="el-button el-button--primary el-button--small">
					<span>点击上传</span>
				</button> <span style="color: red;">上传图片顺序：身份证正反面、手持银行卡</span>
				<el-col :span="24">
                    <el-col :offset="1" :span="3" v-for="(item,index) in imgUrl" >
                        <img src="./../../assets/icon_close.png" @click="deldeImg(index)" style="width: 15px;position: relative;left: 180px;top: 20px;">
    					<img style="width: 100%;margin-right:20px;" :src="item" alt="">
                    </el-col>
				</el-col>
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
                list:[],
                sysDiv:false,
                btnShow:false,
                listLoading:false,
                editForm:{},
				editLoading:false,
				infoShow:false,
				phone:'',
				username:'',
				bankAccountLast4Num:'',
				bankAccountName:'',
				bankName:'',
				token:'',
				formData: new FormData(),
                fileImg: '',
                imgUrl:[],
                imgUrl1:[],
                upImg:'',
                total:0,
                page:1
			}
		},
        computed: {

        },
		methods: {
            deldeImg(index){
                this.imgUrl.splice(index, 1)
                this.imgUrl1.splice(index, 1)
            },
			unbading(){
				 this.$confirm('确认解绑该用户银行卡?', '提示', {
                }).then(() => {
					const _this = this
					if(_this.imgUrl1.length === 3){
						_this.upImg = _this.imgUrl1.join(";")
						$.ajax({
		                    type:'POST',
		                    dataType:'json',
		                    url:baseUrl+'/admin/userCardManage/userUnBindFunction?token='+_this.token +'&username='+_this.phone+'&image='+_this.upImg,
		                    data:"",
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
	              }else{
						_this.$message({
	                        message: '请上传3张图片（身份证正反面、手持银行卡）',
	                        type: 'error',
	                        duration:2000
	                    });
					}
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
			},
			submitUpload(){
				const _this= this
                _this.$http.post(baseUrl+'/act/actbanner/uploadImage?type=6&token='+_this.token+'&username='+_this.username, _this.formData, {
                    progress(event) {
                    }
                })
                .then(response => {
                	const info = JSON.parse(response.bodyText);
                	for (var i = 0; i < info.data.length; i++) {
                    	_this.imgUrl.push(info.data[i].previewUrl)
                    	_this.imgUrl1.push(info.data[i].filePath)
                	}
                }, error => _this.$emit('complete', 500, error.message))
			},
			upload (event) {
                this.formData = new FormData()
                let file = event.target.files
                for (var i = 0; i < file.length; i++) {
		        	this.formData.append('file',file[i])
		        }
		        this.submitUpload()
            }
		},
		mounted() {
			this.token = sessionStorage.getItem('token')
            this.token = JSON.parse(this.token)
            // this.getlist()
		}
	}
</script>

<style>

</style>