<template>
	<section>
		<!--工具条-->
		<el-col :span="24" class="toolbar" style="padding-bottom: 0px;background: #fff">
			<el-form :inline="true">
				<!-- <el-form-item label="用户id">
				    <el-input v-model="id"></el-input>
				</el-form-item> -->
				<el-form-item label="用户名">
				    <el-input v-model="username" @keyup.enter.native="keyLogin"></el-input>
				</el-form-item>
				<el-form-item label="状态">
					<el-select v-model="type" clearable>
				      <el-option v-for="item in options" :label="item.label" :value="item.value">
				      </el-option>
				    </el-select>
				</el-form-item>
				<el-form-item label="时间">
					<el-date-picker
				      v-model="value"
				      type="daterange"
				      placeholder="选择时间范围">
				    </el-date-picker>
				</el-form-item>
				<el-form-item>
					<el-button type="primary" v-on:click="getlist">查询</el-button>
					<!-- <el-button type="primary">导出订单</el-button> -->
				</el-form-item>
			</el-form>
		</el-col>

		<!--列表-->
		<el-table :data="list" highlight-current-row v-loading="listLoading" border style="width: 100%;min-width: 1080px;">
			<el-table-column type="index" width="80px">
			</el-table-column>
			<el-table-column prop="orderId"  label="系统订单号">
			</el-table-column>
			<el-table-column prop="bankAccount"  label="充值银行卡号">
			</el-table-column>
			<el-table-column prop="idCard"  label="身份证号码">
			</el-table-column>
			<el-table-column prop="realName"  label="付款人姓名">
			</el-table-column>
			<!-- <el-table-column prop="phone" label="手机号码">
			</el-table-column> -->
			<el-table-column prop="username"  label="用户名">
				<template scope="scope">
                  <router-link :to="{ name: '注册用户信息',params: { id: '01', time: scope.row.username}}"   style="margin: 0 10px;">
                    <el-button  type="text" size="small">{{scope.row.username}}</el-button>
                  </router-link>
                </template>
			</el-table-column>
			<el-table-column prop="serviceOrderId" :formatter='serviceSan' label="第三方支付订单号">
			</el-table-column>
			<el-table-column prop="transMoney"  label="交易金额">
			</el-table-column>
			<el-table-column prop="insertTime" label="订单生成时间">
			</el-table-column>
			<el-table-column prop="updateTime"  label="交易时间">
			</el-table-column>
			<el-table-column prop="insertTime" width="180px" label="插入时间">
            </el-table-column>
			<el-table-column prop="status"  label="交易状态" :formatter='fstatus'>
			</el-table-column>
			<el-table-column prop="returnMsg"  label="描述信息">
			</el-table-column>
			<el-table-column prop="remark"  label="备注">
			</el-table-column>
			<!-- <el-table-column label="操作">
				<template scope="scope">
					<el-button type="text" size="small" @click="handEnabled(scope.$index, scope.row)">查看</el-button>
				</template>
			</el-table-column> -->
		</el-table>

		<!--工具条-->
		<el-col :span="24" class="toolbar" style="background:#fff;">
			<el-pagination layout="total,prev, pager, next,jumper" @current-change="handleCurrentChange" :page-size="10" :total="total" style="float:right;">
			</el-pagination>
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
				token:'',
				id:'',
				username:'',
				type:'',
				value:'',
				list: [],
				options: [{
		          value: '0',
		          label: '处理中'
		        }, {
		          value: '1',
		          label: '交易成功'
		        }, {
		          value: '2',
		          label: '交易失败'
		        }, {
		          value: '-1',
		          label: '支付超时'
		        }],
				total: 0,
				page: 1,
				listLoading: false,
				payTimeSt:'',
				payTimeEt:''
			}
		},
        computed: {
            // 实时更新上传图片的名字，仅读取，值只须为函数
            imageChange: function () {
                return this.fileImg
            }
        },
		methods: {
			keyLogin(ev){
             if (ev.keyCode==13){
                 this.getlist()
             }
            },
			getlist(){
				const _this = this;
				let url = baseUrl+'/pay/payrechargerecord/pageListRechageRecord?token='+_this.token+'&currentPage='+_this.page+'&pageSize=10&username='+_this.username+'&status='+_this.type
				if(this.value === undefined){
					_this.payTimeSt = ''
                    _this.payTimeEt = ''
                    url = baseUrl+'/pay/payrechargerecord/pageListRechageRecord?token='+_this.token+'&currentPage='+_this.page+'&pageSize=10&username='+_this.username+'&status='+_this.type
				}else{
					if(this.value !== undefined && this.value !== '' && this.value[0] !== null){
	                    const sy = this.value[0].getMonth() + 1
	                    const ey = this.value[1].getMonth() + 1
	                    _this.payTimeSt = this.value[0].getFullYear() + '-'+ sy + '-' + this.value[0].getDate()
	                    _this.payTimeEt = this.value[1].getFullYear() + '-'+ ey + '-' + this.value[1].getDate()
	                    url = baseUrl+'/pay/payrechargerecord/pageListRechageRecord?token='+_this.token+'&currentPage='+_this.page+'&pageSize=10&username='+_this.username+'&status='+_this.type+'&timeSt='+_this.payTimeSt+'&timeEt='+_this.payTimeEt
	                }else{
	                    _this.payTimeSt = ''
	                    _this.payTimeEt = ''
	                    url = baseUrl+'/pay/payrechargerecord/pageListRechageRecord?token='+_this.token+'&currentPage='+_this.page+'&pageSize=10&username='+_this.username+'&status='+_this.type
	                }
				}
				
				
				// if(this.value !== '' && this.value[0] !== null){
				// 	url = baseUrl+'/pay/payrechargerecord/pageListRechageRecord?token='+_this.token+'&currentPage='+_this.page+'&pageSize=10&username='+_this.username+'&status='+_this.type+'&timeSt='+_this.payTimeSt+'&timeEt='+_this.payTimeEt
				// }else{
				// 	url = baseUrl+'/pay/payrechargerecord/pageListRechageRecord?token='+_this.token+'&currentPage='+_this.page+'&pageSize=10&username='+_this.username+'&status='+_this.type
				// }
				$.ajax({
                    type:'POST',
                    dataType:'json',
                    url:url,
                    data:"",
                    contentType:'application/json;charset=utf-8',
                    error: function (XMLHttpRequest, textStatus, errorThrown) {},
                    success:function(data){
                        if(data.code === 200){
                        	_this.total = data.data.pageUtils.totalCount
                        	_this.page = data.data.pageUtils.currPage
                        	_this.list = data.data.pageUtils.list
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
			handleCurrentChange(val) {
				this.page = val;
				this.getlist();
			},
            fstatus(row,column){
                if(row.status === '0'){
                	return '处理中'
                }else if(row.status === '1'){
                	return '交易成功'
                }else if(row.status === '2'){
                	return '交易失败'
                }else if(row.status === '-1'){
                	return '支付超时'
                }
            },
            serviceSan(row,column){
                if(row.serviceOrderId === '30'){
                	return '后台管理员手动充值'
                }else{
                	return row.serviceOrderId
                }
            }
		},
		mounted() {
			this.token = sessionStorage.getItem('token')
			this.token = JSON.parse(this.token)
		 	
		 	if(this.$route.params.time !== '00'){
		 		let date = new Date(this.$route.params.time)
		 		this.value = [date,date]
		 		this.type = '1'
		 	}
		 	if(this.$route.params.user !== '00'){
		 		this.username = this.$route.params.user
		 		this.type = '1'
		 	}
		 	this.getlist();
		}
	}
</script>

<style>
</style>