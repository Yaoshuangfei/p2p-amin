 <template>
	<section>
		<!--工具条-->
		<el-col :span="24" class="toolbar" style="padding-bottom: 0px;background: #fff">
			<el-form :inline="true" :model="filters">
				<el-form-item label="类型">
				    <el-select v-model="filters.type" clearable>
				      <el-option v-for="item in types" :label="item.label" :value="item.value">
				      </el-option>
				    </el-select>
				</el-form-item>
				<el-form-item label="状态">
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
		<el-table :data="list" highlight-current-row v-loading="listLoading" style="width: 100%;min-width: 1080px;">
			<el-table-column type="index">
			</el-table-column>
			<el-table-column prop="title" label="名称">
			</el-table-column>
			<!-- <el-table-column prop="content"  label="文章内容">
			</el-table-column> -->
			<el-table-column prop="imageUrl" label="标题缩略图">
				<template scope="scope">
					<img class="img" :src="scope.row.imageUrl" alt="">
				</template>
			</el-table-column>
			<el-table-column prop="type"  :formatter='formatterType' label="类型">
			</el-table-column>
			<el-table-column prop="status" :formatter='formatterStatus' label="状态">
			</el-table-column>
			<el-table-column prop="label"  label="标签">
			</el-table-column>
			<el-table-column prop="description" label="描述">
			</el-table-column>
			<el-table-column prop="activityUrl"  label="活动链接">
			</el-table-column>
			<el-table-column prop="insertTime" label="插入时间">
			</el-table-column>
			<el-table-column label="操作">
				<template scope="scope">
					<el-button type="text" v-if='scope.row.status === "0"' size="small" @click="showBtn(scope.$index, scope.row)">启用</el-button>
					<el-button type="text" v-if='scope.row.status === "1"' size="small" @click="hiddenBtn(scope.$index, scope.row)">禁用</el-button>
					<!-- <el-button type="text" v-if='scope.row.status ===0' size="small" @click="handmodify(scope.$index, scope.row)">修改</el-button> -->
					<el-button type="text" size="small" @click="deletBtn(scope.$index, scope.row)">删除</el-button>
				</template>
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
				filters: {
					status:'',
					type:''
				},
				types:[{
		          value: '10',
		          label: '平台日常公告'
		        }, {
		          value: '20',
		          label: '活动公告'
		        }, {
		          value: '30',
		          label: '首页的banner下发的图标'
		        }],
				options: [{
		          value: '1',
		          label: '可用'
		        }, {
		          value: '0',
		          label: '不可用'
		        }],
		        list:[],
				users: [],
				total: 0,
				page: 1,
				listLoading:false
			}
		},
        computed: {
            // 实时更新上传图片的名字，仅读取，值只须为函数
            imageChange: function () {
                return this.fileImg
            }
        },
		methods: {
			getlist(){
				const _this = this;
                _this.orderInformation = [];
				const params = {
                    poType:''
				};
                var url = baseUrl+"/act/actnotice/pageNotice?token="+_this.token+'&currentPage='+_this.page+'&type='+_this.filters.type+'&status='+_this.filters.status;
                var data =JSON.stringify(params);
                $.ajax({
                    type:'GET',
                    dataType:'json',
                    url:url,
                    // data:JSON.stringify(params),
                    // data:'',
                    contentType:'application/json;charset=utf-8',
                    error: function (XMLHttpRequest, textStatus, errorThrown) {},
                    success:function(data){
                        // console.log(data)
                        if(data.code === 200){
                            _this.total = data.data.totalCount
                            _this.page = data.data.currPage
                            _this.list = data.data.list
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
                            // alert(data.message);
                        }
                    }
                });
			},
			handleCurrentChange(val) {
				this.page = val;
				this.getlist();
			},
			showBtn: function (index, row) {
                this.$confirm('确认启用吗?', '提示', {
                }).then(() => {
                    const _this = this
                    var url = baseUrl+"/act/actnotice/update?status=1&token="+_this.token+'&noticeId='+row.noticeId;
                    $.ajax({
                        type:'POST',
                        dataType:'json',
                        url:url,
                        // data:data,
                        contentType:'application/json;charset=utf-8',
                        error: function (XMLHttpRequest, textStatus, errorThrown) {},
                        success:function(data){
                            if(data.code !== 200){
                                _this.$message({
                                    message: data.data.info,
                                    type: 'error'
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
                                    message: data.data.info,
                                    type: 'success'
                                });
                                _this.getlist();
                            }
                        }
                    });
                }).catch(() => {

                });
            },
            hiddenBtn: function (index, row) {
                this.$confirm('确认禁用吗?', '提示', {
                }).then(() => {
                    const _this = this
                    var url = baseUrl+"/act/actnotice/update?status=0&token="+_this.token+'&noticeId='+row.noticeId;
                    $.ajax({
                        type:'POST',
                        dataType:'json',
                        url:url,
                        // data:data,
                        contentType:'application/json;charset=utf-8',
                        error: function (XMLHttpRequest, textStatus, errorThrown) {},
                        success:function(data){
                        	if(data.code !== 200){
                                _this.$message({
                                    message: data.data.info,
                                    type: 'error'
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
                                    message: data.data.info,
                                    type: 'success'
                                });
                                _this.getlist();
                            }
                        }
                    });
                }).catch(() => {

                });
            },
            deletBtn: function (index, row) {
                this.$confirm('确认删除吗?', '提示', {
                }).then(() => {
                    const _this = this
                    var url = baseUrl+"/act/actnotice/toDel?token="+_this.token+'&noticeId='+row.noticeId;
                    $.ajax({
                        type:'POST',
                        dataType:'json',
                        url:url,
                        // data:data,
                        contentType:'application/json;charset=utf-8',
                        error: function (XMLHttpRequest, textStatus, errorThrown) {},
                        success:function(data){
                            if(data.code !== 200){
                                _this.$message({
                                    message: data.data.info,
                                    type: 'error'
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
                                    message: data.data.info,
                                    type: 'success'
                                });
                                _this.getlist();
                            }
                        }
                    });
                }).catch(() => {

                });
            },
            formatterType(row,column){
                if(row.type === '10'){
                	return '平台日常公告'
                }else if(row.type === '20'){
                	return '活动公告'
                }else if(row.type === '30'){
                    return '首页的banner下发的图标'
                }
            },
            formatterStatus(row,column) {
            	if(row.status === '0'){
                	return '不可用'
                }else if(row.status === '1'){
                	return '可用'
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
	img{width: 100px;}
</style>