<template>
	<section>
		<!--工具条-->
		<el-col :span="24" class="toolbar" style="padding-bottom: 0px;background: #fff">
			<el-form :inline="true">
				<el-form-item label="用户名：">
				    <el-input v-model="username"></el-input>
				</el-form-item>
				<el-form-item label="时间范围：">
					<el-date-picker
				      v-model="value"
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
			<el-table-column type="index">
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
			<el-table-column prop="idCard"  label="用户身份证" width="190px">
			</el-table-column>
			<el-table-column prop="bankAccount"  label="银行卡号" width="190px">
			</el-table-column>
			<el-table-column prop="bankName"  label="开户银行">
			</el-table-column>
			<el-table-column prop="phone"  label="预留号码">
			</el-table-column>
			<el-table-column prop="insertTime"  label="绑定时间">
			</el-table-column>
			<el-table-column prop="isBlack" label=" 是否是黑名单">
			</el-table-column>
			<el-table-column prop="isBindBank" label="绑卡状态">
			</el-table-column>
			<!-- <el-table-column prop="provinceCode"  label="省份编码">
			</el-table-column>
			<el-table-column prop="cityCode"  label="城市编码">
			</el-table-column>
			<el-table-column prop="depositBankBranch" label="支行">
			</el-table-column> -->
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
                    url:baseUrl+'/admin/userCardManage/opUserCardManageRecord?token='+_this.token+'&currentPage='+_this.page+'&username='+_this.username+'&insertTimeSt='+_this.payTimeSt+'&insertTimeEt='+_this.payTimeEt,
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
            formatterType(row,column){
                let type = ''
                if(row.status === 1){
                	type = '启用'
                }else{
                	type = '禁用'
                }
                return type
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