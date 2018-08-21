<template>
	<section>
		<!--工具条-->
		<el-col :span="24" style="text-align: center;margin-top: 10px;">注册用户信息</el-col>
		<el-col :span="24" class="toolbar" style="padding-bottom: 0px;background: #fff">
			<el-form :inline="true" :model="filters">
				<el-form-item label="关键字">
				    <el-input v-model="filters.keyword" @keyup.enter.native="keyLogin" style="width: 150px;"></el-input>
				</el-form-item>
				<el-form-item label="渠道号">
				    <el-input v-model="filters.opChannelId" @keyup.enter.native="keyLogin" style="width: 150px;"></el-input>
				</el-form-item>
				<el-form-item label="注册时间">
				    <el-date-picker
				      v-model="filters.time"
				      type="daterange"
				      placeholder="选择时间范围">
				    </el-date-picker>
				</el-form-item>
				<el-form-item label="是否绑卡">
					<el-select v-model="filters.status" clearable>
				      <el-option v-for="item in optionsBind" :label="item.label" :value="item.value">
				      </el-option>
				    </el-select>
				</el-form-item>
				<!-- <el-form-item label="等级">
				    <el-select v-model="filters.pname" clearable>
				      <el-option v-for="item in level" :label="item.label" :value="item.value">
				      </el-option>
				    </el-select>
				</el-form-item> -->
				<el-form-item label="投资总额范围">
					<el-input v-model="filters.freezeMoneyMin" @keyup.enter.native="keyLogin" style="width: 130px;"></el-input>
				</el-form-item>
				<el-form-item label="—">
					<el-input v-model="filters.freezeMoneyMax" @keyup.enter.native="keyLogin" style="width: 130px;"></el-input>
				</el-form-item>
				<el-form-item label="（万）">
				</el-form-item>
				<el-form-item>
					<el-button type="primary" v-on:click="getlist">查询</el-button>
				</el-form-item>
			</el-form>
		</el-col>

		<!--列表-->
		<el-table :data="list" highlight-current-row v-loading="listLoading" border style="width: 100%;min-width: 1080px;">
			<el-table-column type="index" width="80px">
			</el-table-column>
			<el-table-column prop="id"  label="用户ID" width="110px">
			</el-table-column>
			<el-table-column prop="username"  label="用户名">
			</el-table-column>
			<el-table-column prop="realName"  label="姓名" width="100px">
			</el-table-column>
			<el-table-column prop="sex"  label="性别" width="100px">
			</el-table-column>
			<el-table-column prop="age"  label="用户年龄" width="100px">
			</el-table-column>
			<el-table-column prop="deviceId"  label="设备号">
			</el-table-column>
			<el-table-column prop="platform"  label="平台" width="100px">
			</el-table-column>
			<el-table-column prop="freezeMoney"  label="投资金额">
			</el-table-column>
			<el-table-column prop="status" label="绑卡状态" width="100px">
			</el-table-column>
			<el-table-column prop="channelCode" label="渠道号" width="100px">
			</el-table-column>
			<!-- <el-table-column prop="vip" label="vip等级">
			</el-table-column> -->
			<el-table-column prop="insertTime"  label="用户注册时间">
			</el-table-column>
			<el-table-column label="操作">
				<template scope="scope">
				<el-col :span="18">
					<router-link :to="{ name: '用户账户详情' ,params: { id: scope.row.id }}"   style="margin: 0 10px;">
						<el-button  type="text" size="small">账户详情</el-button>
					</router-link>
				</el-col>
				<el-col :span="24" :offset="2">
					<el-button type="text" size="small" @click="editUserPhone(scope.$index, scope.row)">修改绑定手机</el-button>
				</el-col>	
				</template>
			</el-table-column>
		</el-table>
		<el-dialog title="修改绑定手机" v-model="changeshow" size='tiny' :close-on-click-modal="false">
			<el-form :model="changeFrom" label-width="90px">
				<el-form-item label="联系电话：">
					<el-input v-model="changeFrom.mobile" placeholder="请输入11位正确的手机号码"  :maxlength="11" type="text" auto-complete="off"></el-input>
				</el-form-item>
			</el-form>
			<div slot="footer" class="dialog-footer" style="text-align: center;">
				<el-button type="primary" @click.native="changeBtn">提交</el-button>
				<el-button type="primary" @click.native="changeshow = false">取消</el-button>
			</div>
		</el-dialog>
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
				list: [],
				filters: {
					opChannelId: '',
					time:'',
					insertTimeSt:'',
					insertTimeEt:'',
					status:'',
					freezeMoneyMin:'',
					freezeMoneyMax:'',
					keyword:''
				},
				changeFrom:{
					mobile:''
				},
				changeshow:false,
				listLoading:false,
				total: 0,
				page: 1,
				optionsBind:[
					{
						label:'已绑定',
						value:'1'
					},
					{
						label:'已解绑',
						value:'-1'
					},
					{
						label:'待绑定',
						value:'0'
					}
				],
				level:[
					{
						label:'所有',
						value:'0'
					},
					{
						label:'是',
						value:'1'
					}
				]
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
            changeBtn(){
            	const _this = this
            	$.ajax({
                    type:'POST',
                    dataType:'json',
                    url:baseUrl+'/admin/user/updatePhone?token='+_this.token+'&userName='+_this.changeFrom.username+'&newPhone='+_this.changeFrom.mobile,
                    contentType:'application/json;charset=utf-8',
                    error: function (XMLHttpRequest, textStatus, errorThrown) {},
                    success:function(data){
                        if(data.code === 200){
                        	_this.$message({
                                message: data.data.info,
                                type: 'success',
                                duration:1000
                            });
                            _this.changeshow = false
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
            editUserPhone(index,row){
            	this.changeshow = true
            	this.changeFrom = row
            },
			getlist(){
				const _this = this;
				if(this.filters.time !== undefined &&this.filters.time[0] !== null && this.filters.time[0] !== undefined){
					const st = this.filters.time[0]
					const et = this.filters.time[1]
					_this.filters.insertTimeSt = (st.getFullYear()) + '-' + (st.getMonth() + 1) + '-' + (st.getDate())+' 00:00:00'
					_this.filters.insertTimeEt = (et.getFullYear()) + '-' + (et.getMonth() + 1) + '-' + (et.getDate())+' 23:59:59'
				}else{
					_this.filters.insertTimeSt = ''
					_this.filters.insertTimeEt = ''
				}
				$.ajax({
                    type:'GET',
                    dataType:'json',
                    url:baseUrl+'/admin/user/opBackGroundUserMessage?token='+_this.token+'&currentPage='+_this.page+'&keyword='+_this.filters.keyword+'&opChannelId='+_this.filters.opChannelId+'&insertTimeSt='+_this.filters.insertTimeSt+'&insertTimeEt='+_this.filters.insertTimeEt+'&status='+_this.filters.status+'&freezeMoneyMin='+_this.filters.freezeMoneyMin+'&freezeMoneyMax='+_this.filters.freezeMoneyMax,
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
            formatterStatus(row,column){
                if(row.status === '0'){
                	return '待绑'
                }else if(row.status === '1'){
                	return '是'
                }else if(row.status === '-1'){
                	return '否'
                }
            },
		},
		mounted() {
			this.token = sessionStorage.getItem('token')
			this.token = JSON.parse(this.token)
			if(this.$route.params.id === '00' && this.$route.params.time === '00'){
				
			}else if(this.$route.params.id === '00' && this.$route.params.time !== '00'){
				let date = new Date(this.$route.params.time)
           		this.filters.time = [date,date]
			}else if(this.$route.params.id === '01' && this.$route.params.time !== '00'){
				this.filters.keyword = this.$route.params.time
			}else{
				this.filters.opChannelId = this.$route.params.id
				let date = new Date(this.$route.params.time)
           		this.filters.time = [date,date]
			}
			this.getlist();
		}
	}
</script>

<style>
</style>