<template>
	<section>
		<!--工具条-->
		<el-col :span="24" class="toolbar" style="padding-bottom: 0px;background: #fff">
			<el-form :inline="true" :model="filters">
				<el-form-item label="产品标题">
				    <el-input v-model="filters.title"></el-input>
				</el-form-item>
				<el-form-item label="年化收益率">
				    <el-input v-model="filters.rate"></el-input>
				</el-form-item>
				<el-form-item label="状态">
					<el-select v-model="filters.status" clearable>
				      <el-option v-for="item in statusList" :label="item.label" :value="item.value">
				      </el-option>
				    </el-select>
				</el-form-item>
				<el-form-item label="产品类型">
				    <el-select v-model="filters.type" clearable>
				      <el-option v-for="item in typeList" :label="item.label" :value="item.value">
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
			<el-table-column type="index" width="60px;">
			</el-table-column>
			<el-table-column prop="title"  label="产品标题">
			</el-table-column>
			<el-table-column prop="totalMoney"  label="总金额">
			</el-table-column>
			<el-table-column prop="yearRate"  label="年化总收益率">
			</el-table-column>
			<el-table-column prop="status" :formatter="formatterStatus" label="状态">
			</el-table-column>
			<el-table-column prop="productType" label="产品类型">
			</el-table-column>
			<el-table-column prop="periodType" label="期限类型取值">
			</el-table-column>
			<el-table-column prop="investType" :formatter="formatterType" label="投资类型">
			</el-table-column>
			<el-table-column prop="saleTime" label="购买时间">
			</el-table-column>
			<el-table-column prop="virtualMoney"  label="虚拟金钱">
			</el-table-column>
			<el-table-column prop="finishTime"  label="结束时间">
			</el-table-column>
			<el-table-column prop="investMoney"  label="投资金额">
			</el-table-column>
			<el-table-column prop="baseRate" label="基础年化收益">
			</el-table-column>
			<el-table-column prop="addRate"  label="加息额度">
			</el-table-column>
			<el-table-column label="操作">
				<template scope="scope">
					<el-button type="text" v-if="scope.row.status === '30' " size="small" @click="virtualInvest(scope.$index, scope.row)">虚拟</el-button>
					<el-button type="text" v-if="scope.row.status === '20' " size="small" @click="updateProductToSale(scope.$index, scope.row)">上架</el-button>
					<el-button type="text" v-if="scope.row.status === '20' " size="small" @click="deldet(scope.$index, scope.row)">删除</el-button>
				</template>
			</el-table-column>
		</el-table>

		<!--工具条-->
		<el-col :span="24" class="toolbar" style="background:#fff;">
			<el-pagination layout="sizes,total,prev, pager, next,jumper" @size-change="handleSizeChange" :page-sizes="[10, 30, 50, 100]" @current-change="handleCurrentChange" :page-size="pSize" :total="total" style="float:right;">
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
				pSize:10,
				filters: {
					title: '',
					rate:'',
					status:'',
					type:''
				},
				statusList:[{
		          value: '20',
		          label: '预约中'
		        }, {
		          value: '30',
		          label: '营销中'
		        }, {
		          value: '31',
		          label: '已售罄'
		        }, {
		          value: '32',
		          label: '结算中'
		        }, {
		          value: '33',
		          label: '已返款'
		        }],
				typeList: [{
		          value: '10',
		          label: '新手产品'
		        }, {
		          value: '20',
		          label: '常规产品'
		        }],
				total: 0,
				page: 0,
				listLoading: false
			}
		},
        computed: {
        	
        },
		methods: {
			getlist(){
				const _this = this;
				$.ajax({
                    type:'POST',
                    dataType:'json',
                    url:baseUrl+'/pro/proproduct/pageListProduct?token='+_this.token+'&currentPage='+_this.page+'&title='+_this.filters.title+'&rate='+_this.filters.rate+'&status='+_this.filters.status+'&type='+_this.filters.type,
                    // data:JSON.stringify(params),
                    contentType:'application/json;charset=utf-8',
                    error: function (XMLHttpRequest, textStatus, errorThrown) {},
                    success:function(data){
                    	if(data.code !== 200){
                            _this.$message({
                                message: data.message,
                                type: 'error',
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
                        	_this.list = data.data.pageList.list
                        	_this.total = data.data.pageList.totalCount
                            _this.page = data.data.pageList.currPage
                            _this.$message({
                                message: '成功',
                                type: 'success',
                                duration:1000
                            });
                        }
                    }
                });
			},
			// 虚拟产品
			virtualInvest(index,row){
				const _this = this
				$.ajax({
                    type:'POST',
                    dataType:'json',
                    url:baseUrl+'/pro/provirtualinvest/virtualInvest?token='+_this.token+'&productId='+row.id,
                    // data:JSON.stringify(params),
                    contentType:'application/json;charset=utf-8',
                    error: function (XMLHttpRequest, textStatus, errorThrown) {},
                    success:function(data){
                    	if(data.code !== 200){
                            _this.$message({
                                message: '虚拟失败',
                                type: 'error',
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
                        	_this.getlist()
                        }
                    }
                });
			},
			// 上架
			updateProductToSale(index,row){
				const _this = this
				$.ajax({
                    type:'POST',
                    dataType:'json',
                    url:baseUrl+'/pro/proproduct/updateProductToSale?token='+_this.token+'&productId='+row.id,
                    contentType:'application/json;charset=utf-8',
                    error: function (XMLHttpRequest, textStatus, errorThrown) {},
                    success:function(data){
                    	if(data.code !== 200){
                            _this.$message({
                                message: '上架失败',
                                type: 'error',
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
                        	_this.getlist()
                        }
                    }
                });
			},
			deldet(index,row){
				this.$confirm('确认删除吗?', '提示', {
                }).then(() => {
					const _this = this
					$.ajax({
	                    type:'POST',
	                    dataType:'json',
	                    url:baseUrl+'/pro/proproduct/delete?token='+_this.token+'&productId='+row.id,
	                    contentType:'application/json;charset=utf-8',
	                    error: function (XMLHttpRequest, textStatus, errorThrown) {},
	                    success:function(data){
	                    	if(data.code !== 200){
	                            _this.$message({
	                                message: '删除失败',
	                                type: 'error',
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
	                        	_this.getlist()
	                        }
	                    }
	                });
	            }).catch(() => {

                });
			},
			handleCurrentChange(val) {
				this.page = val;
				this.getlist();
			},
			handleSizeChange(val){
                this.pSize = val
                this.getlist()
            },
            formatterType(row,column){
                if(row.investType === '0'){
                	return '贸易通'
                }else if(row.investType === '1'){
                	return '车贷宝'
                }else if(row.investType === '2'){
                	return '货押宝'
                }else{
                	return '货押宝'
                }
            },
            formatterStatus(row,column) {
            	if(row.status === '20'){
                	return '预约中'
                }else if(row.status === '30'){
                	return '营销中'
                }else if(row.status === '31'){
                	return '已售罄'
                }else if(row.status === '32'){
                	return '结算中'
                }else if(row.status === '33'){
                	return '已返款'
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