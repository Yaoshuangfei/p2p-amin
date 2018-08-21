 <template>
	<section>
		<!--工具条-->
		<el-col :span="24" class="toolbar" style="padding-bottom: 0px;background: #fff">
			<el-form :inline="true" :model="filters">
				<el-form-item label="banner类型">
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
                <!-- <el-form-item>
                    <el-col :span="24" style="color: red">渠道id为负的 则为针对此渠道不展示</el-col>
                </el-form-item> -->
            </el-form>
		</el-col>

		<!--列表-->
		<el-table :data="list" highlight-current-row v-loading="listLoading" style="width: 100%;min-width: 1080px;">
			<el-table-column type="index">
			</el-table-column>
			<el-table-column prop="title" label="名称" width="100px">
			</el-table-column>
			<el-table-column prop="description"  label="描述">
			</el-table-column>
			<!-- <el-table-column prop="imgUrl" label="图片URL地址">
			</el-table-column> -->
			<el-table-column prop="picture" label="图片">
				<template scope="scope">
					<img class="img" :src="scope.row.imgUrl" alt="">
				</template>
			</el-table-column>
			<el-table-column prop="type"  :formatter='formatterType' label="状态" width="100px">
			</el-table-column>
			<el-table-column prop="status"  :formatter='formatterpoType' label="类型" width="100px">
			</el-table-column>
			<el-table-column prop="activityUrl" label="活动链接">
			</el-table-column>
			<el-table-column prop="opChannelCode"  label="展示的渠道" :formatter='formatteID1' width="150px">
			</el-table-column>
            <el-table-column prop="removeOpChannelCode"  label="不展示的渠道" :formatter='formatteID'>
            </el-table-column>
			<!-- <el-table-column prop="actNoticeId"  label="公告id"> -->
			</el-table-column>
			<el-table-column prop="insertTime" label="插入时间">
			</el-table-column>
			<!-- <el-table-column prop="remark" label="备注"> -->
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
		<!--修改banner-->
		<el-dialog title="修改banner" v-model="modifybannerdiv" :close-on-click-modal="false">
			<el-form :model="editForm" label-width="60px" :rules="editFormRules" ref="editForm">
				<el-form-item label="链接">
					<el-input v-model="editForm.link" type="text" auto-complete="off"></el-input>
				</el-form-item>
				<el-form-item label="banner">
					<!-- <el-input v-model="editForm.picture" type="text" auto-complete="off"></el-input> -->
					<img style='width: 100px' :src="editForm.picture">
					<input type="file" style="position:absolute;opacity:0;width:70px;height:30px;margin-right:10px"  @change="upload" id="fileInputs">
					<button type="button" class="el-button el-button--primary el-button--small">
						<span>点击上传</span>
					</button>
					<!-- <button type="button" class="el-button el-button--primary el-button--small" id="btnClears" @click="modifyclear">清空上传</button> -->
					<!-- <span style="display: block;font-size: 12px">{{ imageChange }}</span> -->
					<!--<button type="button" class="el-button el-button&#45;&#45;primary el-button&#45;&#45;small" id="btnClear" @click="clear">清空上传</button>-->
					<!--<span style="display: block;font-size: 12px">{{ imageChange }}</span>-->
				</el-form-item>
				<el-form-item label="序号" >
					<el-input v-model="editForm.orderSort" type="text" auto-complete="off"></el-input>
				</el-form-item>
				<el-form-item label="描述">
					<el-input v-model="editForm.desc" type="text" auto-complete="off"></el-input>
				</el-form-item>
				<el-col :span='24'></el-col>
			</el-form>
			<div slot="footer" class="dialog-footer" style="text-align: center;">
				<el-button type="primary" @click.native="modifyUpload" :loading="editLoading">修改</el-button>
				<el-button type="primary" @click.native="modifybannerdiv = false">取消</el-button>
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
				filters: {
					status:'',
					type:''
				},
				types:[{
		          value: '0',
		          label: '网站'
		        }, {
		          value: '1',
		          label: '手机'
		        }, {
		          value: '2',
		          label: 'WAP'
		        }],
				options: [{
		          value: '1',
		          label: '使用中'
		        }, {
		          value: '0',
		          label: '未使用'
		        }],
		        list:[],
				total: 0,
				page: 1,
				listLoading: false,
				sels: [],//列表选中列
				editFormVisible: false,//编辑界面是否显示
				editLoading: false,
				editFormRules: {
					name: [
						{ required: true, message: '请输入姓名', trigger: 'blur' }
					]
				},
				//编辑界面数据
				editForm:{},

				addbannerdiv: false,//新增界面是否显示
                modifybannerdiv: false,//新增界面是否显示
				addLoading: false,
				//新增界面数据
				uploadDetails: {
					poType:'',
				},
                formData: new FormData(),
                fileImg: ''
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
				const _this = this
                var url = baseUrl+"/act/actbanner/pageListBanner?token="+_this.token+'&currentPage='+_this.page+'&type='+_this.filters.type+'&status='+_this.filters.status;
                $.ajax({
                    type:'POST',
                    dataType:'json',
                    url:url,
                    contentType:'application/json;charset=utf-8',
                    error: function (XMLHttpRequest, textStatus, errorThrown) {},
                    success:function(data){
                        if(data.code === 200){
                            _this.total = data.data.pageListNotice.totalCount
                            _this.page = data.data.pageListNotice.currPage
                            _this.list = data.data.pageListNotice.list
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
			showBtn: function (index, row) {
				const _this = this
                var url = baseUrl+"/act/actbanner/update?status=1&token="+_this.token+'&bannerId='+row.id;
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
                            _this.$message({
                                message: data.data.info,
                                type: 'success',
                                duration:1000
                            });
                            _this.getlist();
                        }
                    }
                });
            },
            hiddenBtn: function (index, row) {
                const _this = this
                var url = baseUrl+"/act/actbanner/update?status=0&token="+_this.token+'&bannerId='+row.id;
                $.ajax({
                    type:'POST',
                    dataType:'json',
                    url:url,
                    // data:data,
                    contentType:'application/json;charset=utf-8',
                    error: function (XMLHttpRequest, textStatus, errorThrown) {},
                    success:function(data){
                    	if(data.code === 200){
                            _this.$message({
                                message: data.data.info,
                                type: 'success'
                            });
                            _this.getlist();
                        }else if(data.code === 403){
                            _this.$message({
                              message: data.message,
                              type: 'error',
                              duration:1000
                            });
                            _this.$router.push({ path: '/login' });
                        }else if(data.code === 500){
                            _this.$message({
                              message: data.message,
                              type: 'error',
                              duration:1000
                            });
                        }else{
                            _this.$message({
                                message: data.data.info,
                                type: 'error'
                            });
                        }
                    }
                });
            },
            deletBtn: function (index, row) {
                this.$confirm('确认删除吗?', '提示', {
                }).then(() => {
                    const _this = this
                    var url = baseUrl+"/act/actbanner/toDel?token="+_this.token+'&bannerId='+row.id;
                    $.ajax({
                        type:'POST',
                        dataType:'json',
                        url:url,
                        // data:data,
                        contentType:'application/json;charset=utf-8',
                        error: function (XMLHttpRequest, textStatus, errorThrown) {},
                        success:function(data){
                            if(data.code === 200){
                                _this.$message({
                                    message: data.message,
                                    type: 'success'
                                });
                                _this.getlist();
                            }else if(data.code === 403){
                                _this.$message({
                                  message: data.message,
                                  type: 'error',
                                  duration:1000
                                });
                                _this.$router.push({ path: '/login' });
                            }else if(data.code === 500){
                                _this.$message({
                                  message: data.message,
                                  type: 'error',
                                  duration:1000
                                });
                            }else{
                                _this.$message({
                                    message: data.data.info,
                                    type: 'error'
                                });
                            }
                        }
                    });
                }).catch(() => {

                });
            },
		    //图片上传
            upload (event) {
                this.formData = new FormData()
                let file = event.target.files[0]
                // console.log(file)
                const self = this
                // const flag = this.flag
                if (file) {
                    // console.log('存在file', file)
                    // console.log(file.size)
                    this.fileImg = file.name
                    // console.log(this.formData)
                    this.formData.append('file', file);
                    // console.log(this.formData);
                } else {
                    this.fileImg = ''
                    // console.log('不存在file', file)
                    this.formData = new FormData()
                }
            },
            //添加
            submitUpload(){
                this.$confirm('确认添加吗？', '提示', {}).then(() => {
                    const _this= this;
                    _this.$http.post(baseUrl+'/api/attachment/upload', _this.formData, {
                        progress(event) {
                        }
                    })
                        .then(response => {
                            const info = JSON.parse(response.bodyText);
                            // const info = response.body
							_this.url = info.data[0].baseUri+info.data[0].uri;
                            _this.UploadImg();
                        }, error => _this.$emit('complete', 500, error.message))
                });
            },
//			图片上传ajax
			UploadImg(){
                const _this= this;
                const params = {
                    link:this.uploadDetails.uploadImgs,
                    picture:this.url,
                    orderSort:this.uploadDetails.List,
                    poType:this.uploadDetails.poType,
                    desc:this.uploadDetails.information,
                };
                // console.log(params)
                var url = baseUrl+"/api/indexAdvert/add";
                var data =JSON.stringify(params);
                $.ajax({
                    type:'POST',
                    dataType:'json',
                    url:url,
                    data:data,
                    contentType:'application/json;charset=utf-8',
                    error: function (XMLHttpRequest, textStatus, errorThrown) {},
                    success:function(data){
                        if(!data.success){
                            alert(data.msg)
						}else{
                            _this.addbannerdiv = false;
                            _this.getlist();
						}
                    }
                });


			},
			handleCurrentChange(val) {
				// console.log(val)
				this.page = val;
				this.getlist();
			},
            formatteID(row,column){
                if(row.removeOpChannelCode === 'null'){
                    return ''
                }else{
                    return row.removeOpChannelCode
                }
            },
            formatteID1(row,column){
                if(row.opChannelCode === 'null'){
                    return ''
                }else{
                    return row.opChannelCode
                }
            },
            handmodify: function (index, row) {
			    this.modifybannerdiv = true;
			    this.editForm = row;
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
			this.getlist()
		}
	}
</script>

<style>
	
</style>