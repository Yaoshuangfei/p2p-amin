<template>
	<section>
		<!--查询工具条-->
		<el-col :span="24" class="toolbar" style="padding-bottom: 0px;background: #fff">
			<el-form :inline="true" :model="filters">
				<el-form-item label="返款时间：">
					<el-date-picker
				      v-model="value"
				      type="daterange"
				      placeholder="选择时间范围">
				    </el-date-picker>
				</el-form-item>
				<el-form-item label="状态：">
				    <el-select v-model="filters.status" clearable>
				      <el-option v-for="item in options" :label="item.label" :value="item.value">
				      </el-option>
				    </el-select>
				</el-form-item>
				<el-form-item>
					<el-button type="primary" v-on:click="getlist">查询</el-button>
				</el-form-item>
			</el-form>
		</el-col>

		<!--列表-->
		<el-table :data="list" highlight-current-row v-loading="listLoading" border style="width: 100%;min-width: 1080px;">
			<el-table-column type="index"  label="序号" width="70px">
			</el-table-column>
			<el-table-column prop="interestDetailId"  label="利息订单id">
			</el-table-column>
			<el-table-column prop="userId"  label="用户id">
			</el-table-column>
			<el-table-column prop="productTitle"  label="产品名称">
			</el-table-column>
			<el-table-column prop="username"  label="用户名">
			</el-table-column>
			<el-table-column prop="realName"  label="用户姓名">
			</el-table-column>
			<el-table-column prop="status"  label="状态">
			</el-table-column>
			<el-table-column prop="productRate" label="产品年化收益率">
			</el-table-column>
			<el-table-column prop="addRate" label="加息券额度">
			</el-table-column>
			<el-table-column prop="totalRate"  label="总年化收益率">
			</el-table-column>
			<el-table-column prop="investMoney"  label="投资金额(元)">
			</el-table-column>
			<el-table-column prop="interest" label="付息(元)">
			</el-table-column>
			<el-table-column prop="backMoney"  label="返款金额(元)">
			</el-table-column>
			<el-table-column prop="saleTime"  label="开售时间">
			</el-table-column>
			<el-table-column prop="buyTime"  label="购买时间">
			</el-table-column>
			<el-table-column prop="backTime"  label="返款时间">
			</el-table-column>
		</el-table>

		<!--分页工具条-->
		<el-col :span="24" class="toolbar" style="background:#fff;">
			<el-pagination layout="total,prev,pager,next,jumper" @current-change="handleCurrentChange" :page-size="30" :total="total" style="float:right;">
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
				time:'',
				value:'',
				options: [{
		          value: '-1',
		          label: '已删除'
		        }, {
		          value: '0',
		          label: '未发放利息'
		        }, {
		          value: '1',
		          label: '发息中'
		        }, {
		          value: '2',
		          label: '已发放利息'
		        }],
				filters: {
					stTime:'',
					etTime:'',
					status:''
				},
				total:0,
				currentPage: 1,
				listLoading: false
				
			}
		},
        computed: {

        },
		methods: {
			getlist(){
				const _this = this;
				if(this.value !== undefined &&this.value !== '' && this.value[0] !== null){
					const sy = this.value[0].getMonth() + 1
					const ey = this.value[1].getMonth() + 1
					_this.filters.stTime = this.value[0].getFullYear() + '-'+ sy + '-' + this.value[0].getDate()
					_this.filters.etTime = this.value[1].getFullYear() + '-'+ ey + '-' + this.value[1].getDate()
				}else{
					_this.filters.stTime = ''
					_this.filters.etTime = ''
				}
				$.ajax({
                    type:'GET',
                    dataType:'json',
                    url:baseUrl+'/pro/prointerestdetail/payInterestDetail?token='+_this.token+'&currentPage='+_this.currentPage+'&stTime='+_this.filters.stTime+'&etTime='+_this.filters.etTime+'&status='+_this.filters.status,
                    // data:JSON.stringify(params),
                    contentType:'application/json;charset=utf-8',
                    error: function (XMLHttpRequest, textStatus, errorThrown) {},
                    success:function(data){
                        if(data.code === 200){
                            _this.list = data.data.list;
                            _this.total = data.data.totalCount;
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
				this.currentPage = val;
				this.getlist();
			},
		},
		mounted() {
			this.token = sessionStorage.getItem('token')
            this.token = JSON.parse(this.token)
            if(this.$route.params.time !== '00'){
            	let date = new Date(this.$route.params.time)
            	this.value = [date,date]
            	this.filters.status = '2'
            }else{
            	this.time = new Date()
            	this.value = [this.time,this.time]
            }
            this.getlist()
            
		}
	}
</script>

<style>
</style>