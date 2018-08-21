<template>
	<section>
		<!--工具条-->
		<el-col :span="24" class="toolbar" style="padding-bottom: 0px;background: #fff">
			<el-form :inline="true">
				<el-form-item label="手机号码：">
				    <el-input v-model="phone" style="width: 200px;"></el-input>
				</el-form-item>
				<el-form-item label="发送时间范围">
				    <el-date-picker
				      v-model="time"
				      type="daterange"
				      placeholder="选择时间范围">
				    </el-date-picker>
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
			<el-table-column prop="phone"  label="手机号码" width="130px">
			</el-table-column>
			<el-table-column prop="sendTime"  label="发送时间" width="200px">
			</el-table-column>
			<el-table-column prop="status"  label="短信发送状态" width="130px" :formatter="formatterType">
			</el-table-column>
			<el-table-column prop="content"  label="短信内容">
			</el-table-column>
		</el-table>
		<!--工具条-->
		<el-col :span="24" class="toolbar" style="background:#fff;">
			<el-pagination layout="total,prev, pager, next,jumper" @current-change="handleCurrentChange" :page-size="30" :total="total" style="float:right;">
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
				phone:'',
				time:'',
				insertTimeSt:'',
				insertTimeEt:''
			}
		},
		methods: {
			getlist(){
				const _this = this;
				if(this.time[0] !== null && this.time[0] !== undefined){
					const st = this.time[0]
					const et = this.time[1]
					_this.insertTimeSt = (st.getFullYear()) + '-' + (st.getMonth() + 1) + '-' + (st.getDate()) + ' 00:00:00'
					_this.insertTimeEt = (et.getFullYear()) + '-' + (et.getMonth() + 1) + '-' + (et.getDate()) + ' 23:59:59'
				}else{
					_this.insertTimeSt = ''
					_this.insertTimeEt = ''
				}
				$.ajax({
                    type:'GET',
                    dataType:'json',
                    url:baseUrl+'/admin/user/smsRecordList?token='+_this.token+'&currentPage='+_this.page+'&phone='+_this.phone+'&insertTimeSt='+_this.insertTimeSt+'&insertTimeEt='+_this.insertTimeEt,
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
			formatterType(row,column){
                if(row.status === '10'){
                	return '已成功'
                }else if(row.status === '20'){
                	return '发送失败'
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
			this.getlist();
		}
	}
</script>

<style>
</style>