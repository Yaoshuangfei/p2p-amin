<template>
	<section>
		<!--工具条-->
		<el-col :span="24" class="toolbar" style="padding-bottom: 0px;background: #fff">
			<el-form :inline="true">
				<el-form-item label="用户名：">
				    <el-input v-model="userName"></el-input>
				</el-form-item>
				<el-form-item label="时间">
					<el-date-picker
				      v-model="value"
				      type="datetimerange"
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
			<el-table-column prop="userName"  label="用户名">
			</el-table-column>
			<el-table-column prop="totalMoney"  label="总金额">
			</el-table-column>
			<el-table-column prop="turnInOrOutMoney"  label="转出金额">
			</el-table-column>
			<el-table-column prop="insertTime"  label="创建时间">
			</el-table-column>
		</el-table>

		<!--工具条 分页-->
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
				userName:'',
				value:'',
				list: [],
				total: 0,
				page: 1,
				listLoading: false
			}
		},
		methods: {
			getlist(){
				const _this = this;
				let url = ''
				if(this.value !== '' && this.value[0] !== null){
					const startDate = _this.value[0].getFullYear()+'-'+_this.value[0].getMonth() + 1+'-'+_this.value[0].getDate()
					const endDate = _this.value[1].getFullYear()+'-'+_this.value[1].getMonth() + 1+'-'+_this.value[1].getDate()
					url = baseUrl+'/pro/proCoinAdminManage/userWalletTurnInOrOutRecord?type=1&currentPage='+_this.page+'&token=b312595f-c654-43f5-9cc9-3af27a1130e2'+'&startDate='+startDate+'&endDate='+endDate
				}else{
					url = baseUrl+'/pro/proCoinAdminManage/userWalletTurnInOrOutRecord?type=1&currentPage='+_this.page+'&token=b312595f-c654-43f5-9cc9-3af27a1130e2'
				}
				$.ajax({
                    type:'GET',
                    dataType:'json',
                    url:url,
                    // data:JSON.stringify(params),
                    // data:'',
                    contentType:'application/json;charset=utf-8',
                    error: function (XMLHttpRequest, textStatus, errorThrown) {},
                    success:function(data){
                        if(data.code === 200){
                            _this.total = data.data.userWalletTurnInOrOutRecordPage.totalCount
                            _this.page = data.data.userWalletTurnInOrOutRecordPage.currPage
                            _this.list = data.data.userWalletTurnInOrOutRecordPage.list
                        }else{
                            // alert(data.message);
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