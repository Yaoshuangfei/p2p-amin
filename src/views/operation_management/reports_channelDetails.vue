<template>
	<section>
		<!--工具条-->
		<el-col :span="24" style="text-align: center;margin-top: 10px;">单个渠道统计</el-col>
		<el-col :span="24" class="toolbar" style="padding-bottom: 0px;background: #fff">
			<el-form :inline="true" :model="filters">
				<el-form-item label="时间" >
				    <el-date-picker 
				      @change="timeg"
				      v-model="filters.time"
				      type="daterange"
				      placeholder="选择时间范围">
				    </el-date-picker>
				</el-form-item>
				<el-form-item>
					<el-button type="primary" v-on:click="getlist">查询</el-button>
					<el-button type="primary" v-on:click="exportExcel">导出</el-button>
				</el-form-item>
			</el-form>
		</el-col>
		<el-col :span="24">
			<el-col :span="4">渠道编号：{{$route.params.id}}</el-col>
			<el-col :span="4">渠道编码：{{$route.params.name}}</el-col>
			<el-col :span="8" v-if="filters.insertTimeSt !== '' ">投放日期：{{filters.insertTimeSt}}~{{filters.insertTimeEt}}</el-col>
		</el-col>
		<!--列表-->
		<el-table :data="list" highlight-current-row v-loading="listLoading" border style="width: 100%;min-width: 1080px;">
			<el-table-column type="index" width="80px" label="序号">
			</el-table-column>
			<el-table-column prop="date"  label="日期">
			</el-table-column>
			<el-table-column prop="activityCount"  label="激活次数">
			</el-table-column>
			<el-table-column prop="regCount"  label="注册人数">
				<template scope="scope">
					<router-link :to="{ name: '注册用户信息' ,params: { id:$route.params.id,time:scope.row.date}}"   style="margin: 0 10px;">
						<el-button  type="text" size="small">{{scope.row.regCount}}</el-button>
					</router-link>
				</template>
			</el-table-column>
			<el-table-column prop="bindCount"  label="绑定次数">
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
				total: 0,
				page: 1,
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
				window.location.href=baseUrl+'/op/opChannelSummary/exportOpSummaryChannelDetail?export=true&token='+_this.token+'&channelCode='+_this.$route.params.id+'&channelName='+_this.$route.params.name+'&queryStartTime='+_this.filters.insertTimeSt+'&queryEndTime='+_this.filters.insertTimeEt
			},
			timeg(){
				if(this.filters.time[0] !== null && this.filters.time[0] !== undefined){
					const st = this.filters.time[0]
					const et = this.filters.time[1]
					this.filters.insertTimeSt = (st.getFullYear()) + '-' + (st.getMonth() + 1) + '-' + (st.getDate())
					this.filters.insertTimeEt = (et.getFullYear()) + '-' + (et.getMonth() + 1) + '-' + (et.getDate())
				}else{
					this.filters.insertTimeSt = ''
					this.filters.insertTimeEt = ''
				}
			},
			getlist(){
				const _this = this;
				$.ajax({
                    type:'GET',
                    dataType:'json',
                    url:baseUrl+'/op/opChannelSummary/opSummaryChannelDetail?token='+_this.token+'&channelCode='+_this.$route.params.id+'&channelName='+_this.$route.params.name+'&queryStartTime='+_this.filters.insertTimeSt+'&queryEndTime='+_this.filters.insertTimeEt,
                    contentType:'application/json;charset=utf-8',
                    error: function (XMLHttpRequest, textStatus, errorThrown) {},
                    success:function(data){
                        if(data.code === 200){
                        	_this.list = data.data.list
                        	// _this.total = data.data.totalCount
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
			handleCurrentChange(val) {
				this.page = val;
				this.getlist();
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