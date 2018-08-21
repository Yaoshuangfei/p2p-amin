 <template>
	<section>
		<el-col :span="24" class="toolbar" style="padding-bottom: 0px;background: #fff">
			<el-form :inline="true">
				<el-form-item label="投资时间：">
					<el-date-picker v-model="valueT" type="date" placeholder="选择日期"></el-date-picker>
				</el-form-item>
				<el-form-item>
					<el-button type="primary" v-on:click="getlist">查询</el-button>
				</el-form-item>
			</el-form>
		</el-col>
		
		<!--列表-->
		<el-table :data="list" highlight-current-row v-loading="listLoading" style="width: 100%;min-width: 1080px;">
			<el-table-column type="index" width="80px">
			</el-table-column>
			<el-table-column prop="summaryDate" label="投资时间">.substring(0,7)
				<template scope="scope">
					{{scope.row.summaryDate.substring(0,10)}}
				</template>
			</el-table-column>
			<el-table-column prop="investAmount" label="投资金额">
				<template scope="scope">
					<router-link :to="{ name: '投资记录' ,params: { time: scope.row.summaryDate,user:'00'}}"   style="margin: 0 10px;">
						<el-button  type="text" size="small">{{scope.row.investAmount*0.01}}</el-button>
					</router-link>
				</template>
			</el-table-column>
			<!-- <el-table-column prop="buyProductSum"  label="购买产品份数">
			</el-table-column> -->
			<el-table-column prop="couponAmount" label="投资券">
				<template scope="scope">
					{{scope.row.couponAmount*0.01}}
				</template>
			</el-table-column>
			
			<!-- <el-table-column label="操作">
				<template scope="scope">
					<el-button type="text" v-if='scope.row.status === "0"' size="small" @click="showBtn(scope.$index, scope.row)">启用</el-button>
					<el-button type="text" v-if='scope.row.status === "1"' size="small" @click="hiddenBtn(scope.$index, scope.row)">禁用</el-button>
			</el-table-column> -->
		</el-table>

		<!--工具条-->
		<el-col :span="24" class="toolbar" style="background:#fff;">
			<el-pagination layout="total,prev, pager, next,jumper" @current-change="handleCurrentChange" :page-size="15" :total="total" style="float:right;">
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
				valueT:'',
		        list:[],
				total: 0,
				page: 1,
				listLoading: false,
				payTime:''
			}
		},
        computed: {

        },
		methods: {
			getlist(){
				const _this = this;
				if(this.valueT !== '' && this.valueT !== undefined){
                    const sy = this.valueT.getMonth() + 1
                    _this.payTime = this.valueT.getFullYear() + '-'+ sy + '-' + this.valueT.getDate()
                }else{
                    _this.payTime = ''
                }
                var url = baseUrl+"/op/opChannel/opInvestSumEveryDay?token="+_this.token+'&currentPage='+_this.page+'&pageSize=15&investTime='+_this.payTime;
                $.ajax({
                    type:'GET',
                    dataType:'json',
                    url:url,
                    contentType:'application/json;charset=utf-8',
                    error: function (XMLHttpRequest, textStatus, errorThrown) {},
                    success:function(data){
                        if(data.code === 200){
                            _this.total = data.data.payWithdrawRecordPage.totalCount
                            _this.page = data.data.payWithdrawRecordPage.currPage
                            _this.list = data.data.payWithdrawRecordPage.list
                        }else{
                            // alert(data.message);
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
                if(row.status === '1'){
                	type = '使用中'
                }else{
                	type = '未使用'
                }
                return type
            },
            formatterpoType(row,column) {
            	if(row.type === '0'){
                	return '网站'
                }else if(row.type === '1'){
                	return '手机'
                }else if(row.type === '2'){
                	return 'WAP'
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