<template>
	<section>
		<!--工具条-->
		<el-col :span="24" class="toolbar" style="padding-bottom: 0px;background: #fff">
			<el-form :inline="true" :model="filters">
				<el-form-item label="用户名">
				    <el-input v-model="filters.username" style="width: 150px;"></el-input>
				</el-form-item>
				<!-- <el-form-item label="时间">
				    <el-date-picker
				      v-model="filters.time"
				      type="datetimerange"
				      placeholder="选择时间范围">
				    </el-date-picker>
				</el-form-item> -->
				<el-form-item>
					<el-button type="primary" v-on:click="getlist">查询</el-button>
				</el-form-item>
			</el-form>
		</el-col>
		<!--列表-->
		<el-table :data="list" highlight-current-row v-loading="listLoading" border style="width: 100%;min-width: 1080px;">
			<el-table-column type="index" width="80px">
			</el-table-column>
			<el-table-column prop="username"  label="用户名">
				<template scope="scope">
					<router-link :to="{ name: '投资记录' ,params: { time: '00', user: scope.row.username }}"   style="margin: 0 10px;">
						<el-button  type="text" size="small">{{scope.row.username}}</el-button>
					</router-link>
				</template>
			</el-table-column>
			<el-table-column prop="investMoney"  label="投资总额">
			</el-table-column>
			<el-table-column prop="couponMoney"  label="投资券金额">
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
			getlist(){
				const _this = this;
				// if(this.filters.time[0] !== null && this.filters.time[0] !== undefined){
				// 	const st = this.filters.time[0]
				// 	const et = this.filters.time[1]
				// 	_this.filters.insertTimeSt = (st.getFullYear()) + '-' + (st.getMonth() + 1) + '-' + (st.getDate()) + ' 00:00:00'
				// 	_this.filters.insertTimeEt = (et.getFullYear()) + '-' + (et.getMonth() + 1) + '-' + (et.getDate()) + ' 00:00:00'
				// }else{
				// 	_this.filters.insertTimeSt = ''
				// 	_this.filters.insertTimeEt = ''
				// }
				$.ajax({
                    type:'GET',
                    dataType:'json',
                    url:baseUrl+'/admin/user/opQueryUserInvest?token='+_this.token+'&currentPage='+_this.page+'&username='+_this.filters.username,
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