<template>
	<section>
		<!--工具条-->
		<el-col :span="24" class="toolbar" style="padding-bottom: 0px;background: #fff">
			<el-form :inline="true">
				<el-form-item label="时间范围：">
					<el-date-picker
				      v-model="value"
				      type="daterange"
				      placeholder="选择时间范围">
				    </el-date-picker>
				</el-form-item>
				<el-form-item>
					<el-button type="primary" v-on:click="getlist">查询</el-button>
					<!-- <el-button type="primary" v-on:click="getlist">更新当天数据</el-button> -->
				</el-form-item>
			</el-form>
		</el-col>

		<!--列表-->
		<el-table :data="list" highlight-current-row v-loading="listLoading" show-summary border style="width: 100%;min-width: 1080px;">
			<el-table-column type="index" width="80px;">
			</el-table-column>
			<el-table-column prop="platform"  label="平台类型" :formatter='platformInt'>
			</el-table-column>
			<el-table-column prop="activityCount" label="激活" >
			</el-table-column>
			<el-table-column prop="regCount" label="注册人数">
			</el-table-column>
			<el-table-column prop="firstVote" label="首投人数">
			</el-table-column>
			<el-table-column prop="firstInvestmentAmount" label="首投金额">
			</el-table-column>
			<el-table-column prop="investmentAmount" label="投资金额">
			</el-table-column>
			<el-table-column prop="streamMoney" label=" 累计存量(充值-提现)">
			</el-table-column>
		</el-table>

		<!--工具条-->
		<el-col :span="24" class="toolbar" style="background:#fff;">
			<el-pagination layout="total,prev, pager, next,jumper" @current-change="handleCurrentChange" :page-size="50" :total="total" style="float:right;">
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
				value:'',
				username:'',
				total: 0,
				page: 1,
				listLoading: false
			}
		},
		methods: {
			getlist(){
				const _this = this;
				if(this.value !== '' && this.value[0] !== null){
                    const sy = this.value[0].getMonth() + 1
                    const ey = this.value[1].getMonth() + 1
                    _this.payTimeSt = this.value[0].getFullYear() + '-'+ sy + '-' + this.value[0].getDate()
                    _this.payTimeEt = this.value[1].getFullYear() + '-'+ ey + '-' + this.value[1].getDate()
                }else{
                    _this.payTimeSt = ''
                    _this.payTimeEt = ''
                }
				$.ajax({
                    type:'GET',
                    dataType:'json',
                    url:baseUrl+'/op/opChannelSummary/getPlatformData?token='+_this.token+'&page='+_this.page+'&timeSt='+_this.payTimeSt+'&timeEt='+_this.payTimeEt,
                    contentType:'application/json;charset=utf-8',
                    error: function (XMLHttpRequest, textStatus, errorThrown) {},
                    success:function(data){
                        // console.log(data)
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
            formatterTime(row,column){
                let curTime = row.createTime;
                curTime = new Date(curTime).toLocaleString()
                return curTime
            },
            platformInt(row,column){
                if(row.platform === '0'){
                	return 'android'
                }else if(row.platform === '1'){
                	return 'ios'
                }else if(row.platform === '2'){
                	return 'pc'
                }else if(row.platform === '3'){
                	return 'wap'
                }
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