<template>
	<section>
		<!--工具条-->
		<el-col :span="24" class="toolbar" style="padding-bottom: 0px;background: #fff">
			<el-form :inline="true" :model="filters">
				<el-form-item label="支付时间：">
				    <el-date-picker
				      v-model="filters.time"
				      type="daterange"
				      placeholder="选择时间范围">
				    </el-date-picker>
				</el-form-item>
				<el-form-item label="渠道编码：">
					<el-input v-model="opchanel"></el-input>
				</el-form-item>
				<el-form-item label="平台：">
				    <el-select v-model="platform" clearable>
				      <el-option v-for="item in options" :label="item.label" :value="item.value">
				      </el-option>
				    </el-select>
				</el-form-item>
				<el-form-item label="用户名：">
					<el-input v-model="userName"></el-input>
				</el-form-item>
				<el-form-item label="是否首投：">
				    <el-select v-model="currentTimes" clearable>
				      <el-option v-for="item in options1" :label="item.label" :value="item.value">
				      </el-option>
				    </el-select>
				</el-form-item>
				<el-form-item>
					<el-button type="primary" v-on:click="getlist">查询</el-button>
					<el-button type="primary" v-on:click="exportExcel">导出</el-button>
				</el-form-item>
			</el-form>
		</el-col>
		<el-col :span="24" style="margin-bottom: 10px;font-size: 16px;">
			<el-col :span="4"><span v-if="allShow">成功投资总次数：</span><span v-else="firstT">成功首投总次数：</span><span v-else="futShou">成功复投总次数：</span>{{successTotalCount}}</el-col>
			<el-col :span="4" v-if="allShow">用户投资本金总金额：{{money}}</el-col>
			<el-col :span="4">成功投资券总金额：{{couponMoney}}</el-col>
			<el-col :span="4" v-if="firstT">用户首投金额：{{totalmoney}}</el-col>
			<el-col :span="4" v-if="futShou">用户复投金额：{{stotalmoney}}</el-col>
		</el-col>
		<!--列表-->
		<el-table :data="list" highlight-current-row v-loading="listLoading" border style="width: 100%;min-width: 1080px;">
			<el-table-column type="index"  width="80px">
			</el-table-column>
			<el-table-column prop="opChannelId"  label="渠道号" width="100px;">
			</el-table-column>
			<el-table-column prop="investName"  label="用户名" width="180px;">
				<template scope="scope">
					<router-link :to="{ name: '注册用户信息',params: { id: '01', time: scope.row.investName}}"   style="margin: 0 10px;">
						<el-button  type="text" size="small">{{scope.row.investName}}</el-button>
					</router-link>
				</template>
			</el-table-column>
			<!-- <el-table-column prop="channelName"  label="渠道名称">
				<template scope="scope">
					<router-link :to="{ name: '单个渠道统计详情' ,params: { id: scope.row.channelCode, name: scope.row.channelName }}"   style="margin: 0 10px;">
						<el-button  type="text" size="small">{{scope.row.channelName}}</el-button>
					</router-link>
				</template>
			</el-table-column> -->
			<el-table-column prop="realName"  label="姓名_是否首投" width="160px;">
			</el-table-column>
			<el-table-column prop="registTime"  label="注册时间">
			</el-table-column>
			<el-table-column prop="title"  label="产品">
			</el-table-column>
			<!-- <el-table-column prop="currentTimes"  label="成功投资次数" width="130px;">
			</el-table-column> -->
			<el-table-column prop="payTime"  label="支付时间">
			</el-table-column>
			<el-table-column prop="totalMoney"  label="总投资(元)" width="110px;">
			</el-table-column>
			<el-table-column prop="investMoney"  label="投资本金(元)" width="120px;">
			</el-table-column>
			<el-table-column prop="money"  label="投资券金额(元)">
			</el-table-column>
			<el-table-column prop="phoneProv"  label="省份" width="100px;">
			</el-table-column>
			
		</el-table>
		<!--工具条-->
		<el-col :span="24" class="toolbar" style="background:#fff;">
			<el-pagination layout="total,prev, pager, next,jumper" @current-change="handleCurrentChange" :page-size="20" :total="total" style="float:right;">
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
				allShow:true,
				firstT:true,
				futShou:true,
				list: [],
				platform:'',
				userName:'',
				total: 0,
				page: 1,
				opchanel:'',
				currentTimes:'',
				options:[
					{value:'0',label:'android'},
					{value:'1',label:'ios'},
					{value:'2',label:'pc'},
					{value:'3',label:'wap'}
				],
				options1:[
					{value:'3',label:'全部'},
					{value:'1',label:'是'},
					{value:'2',label:'否'}
				],
				listLoading: false,
				filters: {
					username: '',
					realName:'',
					insertTimeSt:'',
					insertTimeEt:'',
					time:''
				},
				successTotalCount:'',
				stotalmoney:'',
				totalmoney:'',
				couponMoney:'',
				money:''
			}
		},
		methods: {
			getlist(){
				const _this = this;
				if(this.currentTimes === '1'){
					this.allShow = false
					this.firstT = true
					this.futShou = false
				}else if(this.currentTimes === '2'){
					this.allShow = false
					this.firstT = false
					this.futShou = true
				}else if(this.currentTimes === '3' || this.currentTimes === '' ){
					this.allShow = true
					this.firstT = true
					this.futShou = true
				}
				if(this.filters.time !== undefined && this.filters.time[0] !== null && this.filters.time[0] !== undefined){
					const st = this.filters.time[0]
					const et = this.filters.time[1]
					_this.filters.insertTimeSt = (st.getFullYear()) + '-' + (st.getMonth() + 1) + '-' + (st.getDate())
					_this.filters.insertTimeEt = (et.getFullYear()) + '-' + (et.getMonth() + 1) + '-' + (et.getDate())
				}else{
					_this.filters.insertTimeSt = ''
					_this.filters.insertTimeEt = ''
				}
				$.ajax({
                    type:'GET',
                    dataType:'json',
                    url:baseUrl+'/op/opChannelSummary/opSummaryRefund?token='+_this.token+'&platform='+_this.platform+'&opchanel='+_this.opchanel+'&pageSize=20&page='+_this.page+'&userName='+_this.userName+'&currentTimes='+_this.currentTimes+'&payTimeSt='+_this.filters.insertTimeSt+'&payTimeEt='+_this.filters.insertTimeEt,
                    contentType:'application/json;charset=utf-8',
                    error: function (XMLHttpRequest, textStatus, errorThrown) {},
                    success:function(data){
                        if(data.code === 200){
                        	_this.list = data.data.list
                        	_this.total = data.data.totalCount
                        	_this.successTotalCount = data.data.totalCount
                        	_this.totalmoney = data.data.firstRefundMoneyMap.totalmoney
                        	_this.stotalmoney = data.data.secondRefundMoneyMap.totalmoney
                        	_this.couponMoney = data.data.totalRefundMoneyMap.couponMoney
                        	_this.money = data.data.totalRefundMoneyMap.money
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
			// 导出
			exportExcel(){
				const _this = this
				if(this.filters.time !== undefined && this.filters.time[0] !== null && this.filters.time[0] !== undefined){
					const st = this.filters.time[0]
					const et = this.filters.time[1]
					_this.filters.insertTimeSt = (st.getFullYear()) + '-' + (st.getMonth() + 1) + '-' + (st.getDate())
					_this.filters.insertTimeEt = (et.getFullYear()) + '-' + (et.getMonth() + 1) + '-' + (et.getDate())
				}else{
					_this.filters.insertTimeSt = ''
					_this.filters.insertTimeEt = ''
				}
				window.location.href=baseUrl+'/op/opChannelSummary/opSummaryRefund?export=true&token='+_this.token+'&platform='+_this.platform+'&opchanel='+_this.opchanel+'&pageSize=20&page='+_this.page+'&userName='+_this.userName+'&currentTimes='+_this.currentTimes+'&payTimeSt='+_this.filters.insertTimeSt+'&payTimeEt='+_this.filters.insertTimeEt
			}
		},
		mounted() {
			this.token = sessionStorage.getItem('token')
			this.token = JSON.parse(this.token)
			this.getlist();
		}
	}
</script>

<style>
</style>