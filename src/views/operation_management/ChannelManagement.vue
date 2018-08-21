<template>
	<section>
		<!--工具条-->
		<el-col :span="24" class="toolbar" style="padding-bottom: 0px;background: #fff">
			<el-form :inline="true">
				<el-form-item label="渠道号：">
					<el-input v-model="id"></el-input>
				</el-form-item>
				<el-form-item label="渠道名称：">
					<el-input v-model="channelName"></el-input>
				</el-form-item>
				<el-form-item label="平台类型：">
				    <el-select v-model="platform" clearable>
				      <el-option v-for="item in options" :label="item.label" :value="item.value">
				      </el-option>
				    </el-select>
				</el-form-item>
				<el-form-item label="状态：">
				    <el-select v-model="status" clearable>
				      <el-option v-for="item in options1" :label="item.label" :value="item.value">
				      </el-option>
				    </el-select>
				</el-form-item>
				<el-form-item>
					<el-button type="primary" v-on:click="getlist">查询</el-button>
					<!-- <el-button type="primary" v-on:click="exportExcel">导出</el-button> -->
				</el-form-item>
				<el-form-item style="float: right;">
					<el-button type="primary" v-on:click="addShow">新增渠道</el-button>
				</el-form-item>
			</el-form>
		</el-col>
		<!--列表-->
		<el-table :data="list" highlight-current-row v-loading="listLoading" border style="width: 100%;min-width: 1080px;">
			<el-table-column type="index"  width="80px">
			</el-table-column>
			<el-table-column prop="id"  label="渠道号" >
			</el-table-column>
			<el-table-column prop="channelName"  label="渠道名称" >
			</el-table-column>
			<el-table-column prop="platform" :formatter='platformInt'  label="平台类型">
			</el-table-column>
			<el-table-column prop="status" :formatter='statusInt' label="状态">
			</el-table-column>
			<el-table-column label="操作">
				<template scope="scope">
					<el-button type="text" size="small" @click="deleteBtn(scope.$index, scope.row)">删除</el-button>
					<el-button type="text" size="small" v-if="scope.row.status === '1'" @click="editStatus('0', scope.row)">禁用</el-button>
					<el-button type="text" size="small" v-else @click="editStatus('1', scope.row)">启用</el-button>
				</template>
			</el-table-column>
		</el-table>
		<!--工具条-->
		<el-col :span="24" class="toolbar" style="background:#fff;">
			<el-pagination layout="total,prev, pager, next,jumper" @current-change="handleCurrentChange" :page-size="10" :total="total" style="float:right;">
			</el-pagination>
		</el-col>
		<el-dialog title="新增渠道" v-model="addD" size='tiny' :close-on-click-modal="false">
            <el-form label-width="120px" :model="filters">
                <el-form-item label="渠道号：">
                    <el-input v-model="filters.id"  type="text" auto-complete="off"></el-input>
                </el-form-item>
                <el-form-item label="渠道名称：">
                    <el-input v-model="filters.channelName"  type="text" auto-complete="off"></el-input>
                </el-form-item>
                <el-form-item label="平台类型：">
                    <el-select v-model="filters.platform" clearable>
				      <el-option v-for="item in options2" :label="item.label" :value="item.value">
				      </el-option>
				    </el-select>
                </el-form-item>
                <!-- <el-form-item label="状态：">
                    <el-select v-model="filters.status" clearable>
				      <el-option v-for="item in options3" :label="item.label" :value="item.value">
				      </el-option>
				    </el-select>
                </el-form-item> -->
            </el-form>
            <div slot="footer" class="dialog-footer" style="text-align: center;">
                <el-button type="primary" @click.native="addBtn">确认</el-button>
                <el-button type="primary" @click.native="addD = false">取消</el-button>
            </div>
        </el-dialog>
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
				platform:'',
				total: 0,
				page: 1,
				opchanel:'',
				options:[
					{value:'0',label:'android'},
					{value:'1',label:'ios'},
					{value:'2',label:'pc'},
					{value:'3',label:'wap'}
				],
				options1:[
					{value:'0',label:'禁用'},
					{value:'1',label:'启用'}
				],
				options2:[
					{value:'0',label:'android'},
					{value:'1',label:'ios'},
					{value:'2',label:'pc'},
					{value:'3',label:'wap'}
				],
				options3:[
					{value:'0',label:'禁用'},
					{value:'1',label:'启用'}
				],
				listLoading: false,
				filters: {
					id: '',
					platform:'',
					channelName:'',
					status:''
				},
				status:'',
				id:'',
				channelName:'',
				ids:[],
				addD:false
			}
		},
		methods: {
			addBtn(){
				this.$confirm('确认添加渠道吗?', '提示', {
                }).then(() => {
					const _this = this
					$.ajax({
	                    type:'POST',
	                    dataType:'json',
	                    url:baseUrl+'/op/opChannel/saveOpChannel?token='+_this.token+'&id='+_this.filters.id+'&platform='+_this.filters.platform+'&channelName='+_this.filters.channelName,
	                    contentType:'application/json;charset=utf-8',
	                    error: function (XMLHttpRequest, textStatus, errorThrown) {},
	                    success:function(data){
	                        if(data.code === 200){
	                        	_this.$message({
	                                message: data.message,
	                                type: 'success',
	                                duration:1000
	                            });
	                            _this.getlist()
	                            _this.addD = false
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
	            }).catch(() => {

                });
			},
			addShow(){
				this.addD = true
			},
			editStatus(idnex,row){
				this.$confirm('确认修改此渠道状态吗?', '提示', {
                }).then(() => {
					const _this = this
					$.ajax({
	                    type:'POST',
	                    dataType:'json',
	                    url:baseUrl+'/op/opChannel/updateOpChannel?token='+_this.token+'&id='+row.id+'&status='+idnex,
	                    contentType:'application/json;charset=utf-8',
	                    error: function (XMLHttpRequest, textStatus, errorThrown) {},
	                    success:function(data){
	                        if(data.code === 200){
	                        	_this.$message({
	                                message: data.message,
	                                type: 'success',
	                                duration:1000
	                            });
	                            _this.getlist()
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
	            }).catch(() => {

                });
			},
			deleteBtn(idnex,row){
				this.$confirm('确认删除此渠道状态吗?', '提示', {
                }).then(() => {
					const _this = this
					_this.ids = []
					_this.ids.push(row.id)
					$.ajax({
	                    type:'POST',
	                    dataType:'json',
	                    url:baseUrl+'/op/opChannel/deleteBatchOpChannel?token='+_this.token+'&ids='+_this.ids,
	                    contentType:'application/json;charset=utf-8',
	                    error: function (XMLHttpRequest, textStatus, errorThrown) {},
	                    success:function(data){
	                        if(data.code === 200){
	                        	_this.$message({
	                                message: data.message,
	                                type: 'success',
	                                duration:1000
	                            });
	                            _this.getlist()
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
	             }).catch(() => {

                });
			},
			getlist(){
				const _this = this
				$.ajax({
                    type:'POST',
                    dataType:'json',
                    url:baseUrl+'/op/opChannel/queryOpChannelList?token='+_this.token+'&platform='+_this.platform+'&id='+_this.id+'&currentPage='+_this.page+'&channelName='+_this.channelName+'&status='+_this.status,
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
            },
            statusInt(row,column){
                if(row.status === '0'){
                	return '禁用'
                }else if(row.status === '1'){
                	return '启用'
                }
            },
			handleCurrentChange(val) {
				this.page = val;
				this.getlist();
			},
			// 导出
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
				window.location.href=baseUrl+'/op/opChannelSummary/exportOpSummaryChannel?export=true&token='+_this.token+'&queryStartTime='+_this.filters.insertTimeSt+'&queryEndTime='+_this.filters.insertTimeEt
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