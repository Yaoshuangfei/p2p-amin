<template>
	<section>
		<!--工具条-->
		<el-col :span="24" style="text-align: center;margin-top: 10px;">渠道汇总统计</el-col>
		<el-col :span="24" class="toolbar" style="padding-bottom: 0px;background: #fff">
			<el-form :inline="true" :model="filters">
				<el-form-item label="时间">
				    <el-date-picker
				      v-model="filters.time"
				      type="daterange"
				      placeholder="选择时间范围">
				    </el-date-picker>
				</el-form-item>
				<el-form-item label="平台：">
				    <el-select v-model="platform" clearable>
				      <el-option v-for="item in options" :label="item.label" :value="item.value">
				      </el-option>
				    </el-select>
				</el-form-item>
				<el-form-item>
					<el-button type="primary" v-on:click="getlist">查询</el-button>
					<el-button type="primary" v-on:click="exportExcel">导出</el-button>
				</el-form-item>
			</el-form>
		</el-col>
		<!--列表-->
		<el-table :data="list" highlight-current-row v-loading="listLoading" border style="width: 100%;min-width: 1080px;">
			<el-table-column prop="num" label="#" width="80px">
			</el-table-column>
			<el-table-column prop="channelCode"  label="渠道编号">
				<template scope="scope">
					<router-link :to="{ name: '单个渠道统计详情' ,params: { id: scope.row.channelCode, name: scope.row.channelName }}"   style="margin: 0 10px;">
						<el-button  type="text" size="small">{{scope.row.channelCode}}</el-button>
					</router-link>
				</template>
			</el-table-column>
			<el-table-column prop="channelName"  label="渠道名称">
				<template scope="scope">
					<router-link :to="{ name: '单个渠道统计详情' ,params: { id: scope.row.channelCode, name: scope.row.channelName }}"   style="margin: 0 10px;">
						<el-button  type="text" size="small">{{scope.row.channelName}}</el-button>
					</router-link>
				</template>
			</el-table-column>
			<el-table-column prop="activityCount"  label="激活次数">
			</el-table-column>
			<el-table-column prop="regCount"  label="注册人数">
			</el-table-column>
			<el-table-column prop="bindCount"  label="绑定次数">
			</el-table-column>
			<el-table-column prop="realNameCount"  label="实名人数">
			</el-table-column>
			<el-table-column prop="channelConversion"  label="渠道转化率(投资人数/注册人数)">
			</el-table-column>
			<el-table-column prop="investNum"  label="投资人数">
			</el-table-column>
			<el-table-column prop="firstVote"  label="首投人数">
			</el-table-column>
			<el-table-column prop="firstInvestmentAmount"  label="首投金额">
			</el-table-column>
			<el-table-column prop="afterCastNumber"  label="复投人数(投资2笔以上人数)">
			</el-table-column>
			<el-table-column prop="afterInvestAmount"  label="复投金额">
			</el-table-column>
			<el-table-column prop="investmentAmount"  label="投资金额">
			</el-table-column>
			<el-table-column prop="reinvestmentRate"  label="重复投资率(第二次以上投资人数/投资总人数)">
			</el-table-column>
			<el-table-column prop="topUpNum"  label="充值人数">
			</el-table-column>
			<el-table-column prop="topUpAmount"  label="充值金额">
			</el-table-column>
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
				list: [],
				platform:'',
				total: 0,
				page: 1,
				options:[
					{value:'0',label:' '},
					{value:'-1',label:'android'},
					{value:'1',label:'ios'},
					{value:'2',label:'pc'},
					{value:'3',label:'wap'}
				],
				listLoading: false,
				filters: {
					username: '',
					realName:'',
					insertTimeSt:'',
					insertTimeEt:'',
					time:''
				}
			}
		},
		methods: {
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
				window.location.href=baseUrl+'/op/opChannelSummary/exportOpSummaryChannel?export=true&token='+_this.token+'&queryStartTime='+_this.filters.insertTimeSt+'&queryEndTime='+_this.filters.insertTimeEt
			},
			getlist(){
				const _this = this;
				_this.listLoading = true
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
                    url:baseUrl+'/op/opChannelSummary/opSummaryChannel?token='+_this.token+'&queryStartTime='+_this.filters.insertTimeSt+'&queryEndTime='+_this.filters.insertTimeEt+'&platform='+_this.platform,
                    contentType:'application/json;charset=utf-8',
                    error: function (XMLHttpRequest, textStatus, errorThrown) {},
                    success:function(data){
                        if(data.code === 200){
                        	_this.list = data.data
                        	// _this.total = data.data.totalCount
                        	_this.listLoading = false
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
                        	 _this.listLoading = false
                            _this.$router.push({ path: '/login' });
                        }else{
                            _this.$message({
                                message: data.message,
                                type: 'error',
                                duration:1000
                            });
                            _this.listLoading = false
                        }
                    }
                });
			},
			handleCurrentChange(val) {
				this.page = val;
				this.getlist();
			}
		},
		mounted() {
			this.token = sessionStorage.getItem('token')
			this.token = JSON.parse(this.token)
			if(this.$route.params.time === '0' && this.$route.params.type === '0'){
				this.platform = ''
				this.filters.insertTimeSt = ''
				this.filters.insertTimeEt = ''
			}else if(this.$route.params.time === '0' && this.$route.params.type !== '0'){
				if(this.$route.params.type === '9'){
					this.platform = ''
				}else{
					this.platform = this.$route.params.type
				}
				this.filters.insertTimeSt = ''
				this.filters.insertTimeEt = ''
			}else if(this.$route.params.time !== '0' && this.$route.params.type === '0'){
				this.platform = ''
				let date = new Date(this.$route.params.time)
           		this.filters.time = [date,date]
			} 
			this.getlist();
		}
	}
</script>

<style>
</style>