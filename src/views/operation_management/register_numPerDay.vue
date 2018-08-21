 <template>
	<section>
		<!--工具条-->
		<el-col :span="24" class="toolbar" style="padding-bottom: 0px;background: #fff">
			<el-form :inline="true">
				<el-form-item label="时间范围：">
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
		<el-table :data="list" highlight-current-row v-loading="listLoading" style="width: 100%;min-width: 1080px;">
			<el-table-column type="index">
			</el-table-column>
			<el-table-column prop="insertTime" label="日期">
				<template scope="scope">
					<router-link :to="{ name: '注册用户信息',params: { id: '00', time: scope.row.insertTime}}"   style="margin: 0 10px;">
						<el-button  type="text" size="small">{{scope.row.insertTime}}</el-button>
					</router-link>
				</template>
			</el-table-column>
			<el-table-column prop="userCount" label="注册人数">
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
				time:'',
		        list:[],
				total: 0,
				page: 1,
				listLoading: false,
				payTimeSt:'',
				payTimeEt:''
			}
		},
		methods: {
			getlist(){
				const _this = this
				if(this.time !== '' && this.time[0] !== null){
                    const sy = this.time[0].getMonth() + 1
                    const ey = this.time[1].getMonth() + 1
                    _this.payTimeSt = this.time[0].getFullYear() + '-'+ sy + '-' + this.time[0].getDate()+ ' 00:00:00' 
                    _this.payTimeEt = this.time[1].getFullYear() + '-'+ ey + '-' + this.time[1].getDate()+ ' 23:59:59'  
                }else{
                    _this.payTimeSt = ''
                    _this.payTimeEt = ''
                }
                var url = baseUrl+"/admin/user/queryUserRegisterDayCount?token="+_this.token+'&insertTimeSt='+_this.payTimeSt+'&insertTimeEt='+_this.payTimeEt+'&currentPage='+this.page
                $.ajax({
                    type:'GET',
                    dataType:'json',
                    url:url,
                    contentType:'application/json;charset=utf-8',
                    error: function (XMLHttpRequest, textStatus, errorThrown) {},
                    success:function(data){
                        if(data.code === 200){
                            _this.list = data.data.list
                            _this.total = data.data.totalCount
                            _this.page = data.data.currPage
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