<template>
	<section>
        <el-table :data="list" highlight-current-row v-loading="listLoading" border style="width: 100%;min-width: 1080px;">
            <el-table-column type="index" width="80px" label="序号">
            </el-table-column>
            <el-table-column prop="username"  label="用户名">
                <template scope="scope">
                  <router-link :to="{ name: '注册用户信息',params: { id: '01', time: scope.row.username}}"   style="margin: 0 10px;">
                    <el-button  type="text" size="small">{{scope.row.username}}</el-button>
                  </router-link>
                </template>
            </el-table-column>
            <el-table-column prop="realName"  label="姓名">
            </el-table-column>
            <el-table-column prop="idCard"  label="身份证">
            </el-table-column>
            <el-table-column prop="bankName"  label="银行卡开户行">
            </el-table-column>
            <el-table-column prop="bankAccount"  label="银行卡号">
            </el-table-column>
            <el-table-column prop="updateTime"  label="申请解绑时间">
            </el-table-column>
            <el-table-column prop="unbindStatus"  label="状态" :formatter='formatterStatus'>
            </el-table-column>
            <el-table-column label="操作">
                <template scope="scope">
                    <el-button type="text"  v-if="scope.row.unbindStatus === '1' " size="small" @click="showBtn(scope.$index, scope.row,1)">审核</el-button>
                    <el-button type="text" size="small" @click="showBtn(scope.$index, scope.row,0)">查看</el-button>
                </template>
            </el-table-column>
        </el-table>
        <!--工具条-->
        <el-col :span="24" class="toolbar" style="background:#fff;">
            <el-pagination layout="total,prev, pager, next,jumper" @current-change="handleCurrentChange" :page-size="10" :total="total" style="float:right;">
            </el-pagination>
        </el-col>
        <!-- <el-form label-width="150px" style="margin-top: 50px;">
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
				</button>
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
	    </el-form> size="tiny"-->
        <el-dialog title="解绑申请" v-model="sysDiv"  :close-on-click-modal="false">
            <el-col :span="24">用户信息</el-col>
            <el-col :span="24" style="text-align: center;line-height:30px;">
                <el-col :span='24'>
                    <el-col :span='11' style="text-align: right;">用户名:</el-col>
                    <el-col :span='12' style="text-align: left;margin-left: 10px;">{{editForm.username}}</el-col>
                </el-col>
                <el-col :span='24'>
                    <el-col :span='11' style="text-align: right;">姓名:</el-col>
                    <el-col :span='12' style="text-align: left;margin-left: 10px;">{{editForm.realName}}</el-col>
                </el-col>
                <el-col :span='24'>
                    <el-col :span='11' style="text-align: right;">身份证:</el-col>
                    <el-col :span='12' style="text-align: left;margin-left: 10px;">{{editForm.idCard}}</el-col>
                </el-col>
                <el-col :span='24'>
                    <el-col :span='11' style="text-align: right;">银行卡开户行:</el-col>
                    <el-col :span='12' style="text-align: left;margin-left: 10px;">{{editForm.bankName}}</el-col>
                </el-col>
                <el-col :span='24'>
                    <el-col :span='11' style="text-align: right;">银行卡号:</el-col>
                    <el-col :span='12' style="text-align: left;margin-left: 10px;">{{editForm.bankAccount}}</el-col>
                </el-col>
                <el-col :span='24'>
                    <el-col :span='11' style="text-align: right;">申请解绑时间:</el-col>
                    <el-col :span='12' style="text-align: left;margin-left: 10px;">{{editForm.updateTime}}</el-col>
                </el-col>
            </el-col>
            <el-col :span='24'>身份证正、反面照片</el-col>
            <el-col :span='24' style="margin-top: 20px;">
                <el-col :span='12'>
                    <img style="width: 300px;" :src="editForm.idCardFront" alt="">
                </el-col>
                <el-col :span='12'>
                    <img style="width: 300px;" :src="editForm.idCardReverse" alt="">
                </el-col>
            </el-col>
            <el-col :span='24' style="margin-top: 20px;">手持银行卡照片</el-col>
            <el-col :span='24' style="margin-top: 20px;">
                <el-col :span='12'>
                    <img style="width: 300px;" :src="editForm.handAndBankImage" alt="">
                </el-col>
            </el-col>
            <div slot="footer" class="dialog-footer" style="text-align: center;margin-top:20px;">
                <el-button type="primary" v-show="btnShow" @click.native="eidtUp('1')">审核通过</el-button>
                <el-button type="primary" v-show="btnShow" @click.native="eidtUp('0')">审核不通过</el-button>
                <el-button type="primary" @click.native="sysDiv = false">关闭</el-button>
            </div>
        </el-dialog>
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
            getlist(){
                const _this = this;
                $.ajax({
                    type:'GET',
                    dataType:'json',
                    url:baseUrl+'/admin/userCardManage/userUnBindBankCardAudit?token='+_this.token+'&pageSize=10&currentPage='+_this.page,
                    contentType:'application/json;charset=utf-8',
                    error: function (XMLHttpRequest, textStatus, errorThrown) {},
                    success:function(data){
                        if(data.code === 200){
                            _this.list = data.data.list
                            _this.total = data.data.totalCount
                            _this.$message({
                                message: data.message,
                                type: 'success',
                                duration:1000
                            });
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
            showBtn(index,row,num){
                this.editForm = row
                this.sysDiv = true
                if(row.unbindStatus === '1'){
                    this.btnShow = true
                }else{
                    this.btnShow = false
                }
                if(num === 0){
                    this.btnShow = false
                }
            },
            eidtUp(num){
                const _this = this
                $.ajax({
                    type:'POST',
                    dataType:'json',
                    url:baseUrl+'/admin/userCardManage/userUnBindBankFunction?token='+_this.token +'&id='+_this.editForm.id+'&number='+num,
                    data:"",
                    contentType:'application/json;charset=utf-8',
                    error: function (XMLHttpRequest, textStatus, errorThrown) {},
                    success:function(data){
                        if(data.code === 200){
                            _this.infoShow = false
                            _this.sysDiv = false
                            _this.getlist()
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
            },
   //          deldeImg(index){
   //              this.imgUrl.splice(index, 1)
   //              this.imgUrl1.splice(index, 1)
   //          },
			// unbading(){
			// 	const _this = this
			// 	_this.upImg = _this.imgUrl1.join(";")
			// 	$.ajax({
   //                  type:'POST',
   //                  dataType:'json',
   //                  url:baseUrl+'/admin/userCardManage/userUnBindFunction?token='+_this.token +'&username='+_this.phone+'&image='+_this.upImg,
   //                  data:"",
   //                  contentType:'application/json;charset=utf-8',
   //                  error: function (XMLHttpRequest, textStatus, errorThrown) {},
   //                  success:function(data){
   //                      console.log(data)
   //                      if(data.code === 200){
   //                      	_this.infoShow = false
   //                          _this.$message({
   //                              message: data.message,
   //                              type: 'success',
   //                              duration:1000
   //                          });
   //                      }else if(data.code === 403){
   //                          _this.$message({
   //                              message: data.message,
   //                              type: 'error',
   //                              duration:1000
   //                          });
   //                          _this.$router.push({ path: '/login' });
   //                      }else{
   //                          _this.$message({
   //                              message: data.message,
   //                              type: 'error',
   //                              duration:1000
   //                          });
   //                      }
   //                  }
   //              });
			// },
			// usnaInfo(){
			// 	if(this.phone.length === 11){
			// 		const _this = this
			// 		$.ajax({
   //                      type:'GET',
   //                      dataType:'json',
   //                      url:baseUrl+'/admin/userCardManage/userCardManageMessage?token='+_this.token +'&username='+_this.phone,
   //                      data:"",
   //                      contentType:'application/json;charset=utf-8',
   //                      error: function (XMLHttpRequest, textStatus, errorThrown) {},
   //                      success:function(data){
   //                          console.log(data)
   //                          if(data.code === 200){
   //                          	_this.username = data.data.username
   //                          	_this.bankAccountLast4Num = data.data.bankAccountLast4Num
   //                          	_this.bankAccountName = data.data.bankAccountName
   //                          	_this.bankName = data.data.bankName
   //                          	_this.infoShow = true
   //                              _this.$message({
   //                                  message: data.message,
   //                                  type: 'success',
   //                                  duration:1000
   //                              });
   //                          }else if(data.code === 403){
   //                              _this.$message({
   //                                  message: data.message,
   //                                  type: 'error',
   //                                  duration:1000
   //                              });
   //                              _this.$router.push({ path: '/login' });
   //                          }else{
   //                              _this.$message({
   //                                  message: data.message,
   //                                  type: 'error',
   //                                  duration:1000
   //                              });
   //                          }
   //                      }
   //                  });
			// 	}
			// },
			// submitUpload(){
			// 	const _this= this
   //              _this.$http.post(baseUrl+'/act/actbanner/uploadImage?type=6&token='+_this.token+'&username='+_this.username, _this.formData, {
   //                  progress(event) {
   //                  }
   //              })
   //              .then(response => {
   //              	const info = JSON.parse(response.bodyText);
   //              	for (var i = 0; i < info.data.length; i++) {
   //                  	_this.imgUrl.push(info.data[i].previewUrl)
   //                  	_this.imgUrl1.push(info.data[i].filePath)
   //              	}
   //              }, error => _this.$emit('complete', 500, error.message))
			// },
			// upload (event) {
   //              this.formData = new FormData()
   //              let file = event.target.files
   //              for (var i = 0; i < file.length; i++) {
		 //        	this.formData.append('file',file[i])
		 //        }
		 //        this.submitUpload()
   //          },
            formatterStatus(row,column){
                if(row.unbindStatus === '1'){
                    return '待审核'
                }else if(row.unbindStatus === '2'){
                    return  '审核失败'
                }else if(row.unbindStatus === '3'){
                    return  '审核成功'
                }
            },
            handleCurrentChange(val) {
                this.page = val;
                this.getlist();
            }
		},
		mounted() {
			this.token = sessionStorage.getItem('token')
            this.token = JSON.parse(this.token)
            this.getlist()
		}
	}
</script>

<style>

</style>