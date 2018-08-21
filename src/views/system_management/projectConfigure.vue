<template>
	<section>
		<!--列表-->
		<el-table :data="list" highlight-current-row v-loading="listLoading" border style="width: 100%;min-width: 1080px;">
			<el-table-column type="index"  label="序号" width="70px">
			</el-table-column>
			<!-- <el-table-column prop="id" width="80px;" label="主键ID">
			</el-table-column> -->
			<el-table-column prop="name"  label="名称功能描述">
				<template scope="scope">
                    <el-popover trigger="hover" placement="top" v-if="scope.row.name !== null && scope.row.name.length > 15">
                      <p>{{ scope.row.name }}</p>
                      <div slot="reference" class="name-wrapper" v-if="scope.row.name !== null && scope.row.name.length > 15">
                        <el-tag style="width:115px;background:#fff;color: #000;">{{ scope.row.name.substring(0,15)}}......</el-tag>
                      </div>
                      <div slot="reference" class="name-wrapper" v-if="scope.row.name !== null && scope.row.name.length < 15">
                        <el-tag style="width:115px;background:#fff;color: #000;">{{ scope.row.name}}</el-tag>
                      </div>
                    </el-popover>
                    <el-col v-if="scope.row.name !== null && scope.row.name.length < 15">{{scope.row.name}}</el-col>
                </template>
			</el-table-column>
			<el-table-column prop="key" width="200px;"  label="key">
			</el-table-column>
			<el-table-column prop="value"  label="value">
				<template scope="scope">
                    <el-popover trigger="hover" placement="top" v-if="scope.row.value !== null && scope.row.value.length > 15">
                      <p>{{ scope.row.value }}</p>
                      <div slot="reference" class="name-wrapper" v-if="scope.row.value !== null && scope.row.value.length > 15">
                        <el-tag style="width:115px;background:#fff;color: #000;">{{ scope.row.value.substring(0,15)}}......</el-tag>
                      </div>
                      <div slot="reference" class="name-wrapper" v-if="scope.row.value !== null && scope.row.value.length < 15">
                        <el-tag style="width:115px;background:#fff;color: #000;">{{ scope.row.value}}</el-tag>
                      </div>
                    </el-popover>
                    <el-col v-if="scope.row.value !== null && scope.row.value.length < 15">{{scope.row.value}}</el-col>
                </template>
			</el-table-column>
			<el-table-column prop="status" width="80px;"  label="状态" :formatter='formatterStatus'>
			</el-table-column>
			<el-table-column prop="insertTime" width="180px;" label="插入时间">
			</el-table-column>
			<el-table-column prop="insertUser" width="150px;" label="数据添加用户ID">
			</el-table-column>
			<!-- <el-table-column prop="updateTime"  label="修改时间">
			</el-table-column>
			<el-table-column prop="updateUser"  label="修改者">
			</el-table-column>
			<el-table-column prop="versions" label="版本号">
			</el-table-column>
			<el-table-column prop="del"  label="是否逻辑删除" :formatter='formatterDel'>
			</el-table-column> -->
			<el-table-column prop="remark"  label="备注">
			</el-table-column>
			<el-table-column label="操作">
				<template scope="scope">
					<el-button type="text" v-if="scope.row.status === '0' " size="small" @click="start(scope.$index, scope.row)">启动</el-button>
                    <el-button type="text" v-if="scope.row.status === '1' " size="small" @click="stop(scope.$index, scope.row)">禁用</el-button>
					<el-button type="text"  size="small" @click="editBtn(scope.$index, scope.row)">修改</el-button>
				</template>
			</el-table-column>
		</el-table>
        
		<!--分页工具条-->
		<el-col :span="24" class="toolbar" style="background:#fff;">
			<el-pagination layout="sizes,total,prev, pager, next,jumper" @size-change="handleSizeChange" @current-change="handleCurrentChange" :page-sizes="[10, 30, 50, 100]" :page-size="pSize" :total="total" style="float:right;">
			</el-pagination>
		</el-col>

        <el-dialog title="修改配置信息" v-model="sysDiv" size="tiny" :close-on-click-modal="false">
            <el-form :model="editForm" label-width="60px">
                <el-form-item label="功能名称描述">
                    <el-input v-model="editForm.name" type="textarea" :rows="2" auto-complete="off"></el-input>
                </el-form-item>
                <el-form-item label="key" >
                    <el-input v-model="editForm.key" type="textarea" :rows="2" auto-complete="off"></el-input>
                </el-form-item>
                <el-form-item label="value">
                    <el-input v-model="editForm.value" type="textarea" :rows="2" auto-complete="off"></el-input>
                </el-form-item>
                <el-form-item label="管理员类型">
                    <el-select v-model="editForm.status" clearable>
                      <el-option v-for="item in types" :label="item.name" :value="item.value"></el-option>
                    </el-select>
                </el-form-item>
                <el-form-item label="备注">
                    <el-input v-model="editForm.remark" type="textarea" :rows="2" auto-complete="off"></el-input>
                </el-form-item>
                <el-col :span='24'></el-col>
            </el-form>
            <div slot="footer" class="dialog-footer" style="text-align: center;">
                <el-button type="primary" @click.native="eidtUp">修改</el-button>
                <el-button type="primary" @click.native="sysDiv = false">取消</el-button>
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
                size:10,
                pSize:10,
				list: [],
				value:'',
				total:0,
				currentPage: 1,
				listLoading: false,
                sysDiv:false,
                editForm:{},
                types:[
                    {value:'1',name:'开启'},
                    {value:'0',name:'关闭'}
                ]
			}
		},
        computed: {

        },
		methods: {
            // 修改
            editBtn(index,row){
                this.sysDiv = true
                this.editForm = row
            },
            eidtUp(){
                const _this = this;
                const params = {
                    status:_this.editForm.status,
                    name:_this.editForm.name,
                    key:_this.editForm.key,
                    value:_this.editForm.value,
                    remark:_this.editForm.remark,
                    id:_this.editForm.id
                }
                $.ajax({
                    type:'POST',
                    dataType:'json',
                    url:baseUrl+'/sys/config/update?token='+_this.token,
                    data:JSON.stringify(params),
                    contentType:'application/json;charset=utf-8',
                    error: function (XMLHttpRequest, textStatus, errorThrown) {},
                    success:function(data){
                        if(data.code !== 200){
                            _this.$message({
                                message: data.message,
                                type: 'error',
                                duration:1000
                            });
                            _this.sysDiv = false
                        }else if(data.code === 403){
                            _this.$message({
                              message: data.message,
                              type: 'error',
                              duration:1000
                            });
                            _this.sysDiv = false
                            _this.$router.push({ path: '/login' });
                        }else{
                            _this.sysDiv = false
                            _this.getlist()
                        }
                    }
                });
            },
			getlist(){
				const _this = this;
				$.ajax({
                    type:'GET',
                    dataType:'json',
                    url:baseUrl+'/sys/config/list?token='+_this.token+'&page='+_this.currentPage+'&pageSize='+_this.pSize,
                    // data:JSON.stringify(params),
                    contentType:'application/json;charset=utf-8',
                    error: function (XMLHttpRequest, textStatus, errorThrown) {},
                    success:function(data){
                        if(data.code === 200){
                            _this.list = data.data.list
                            _this.total = data.data.totalCount
                            _this.size = data.data.pageSize
                            _this.$message({
                                message: '成功',
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
			start(index,row){
				const _this = this;
				const params = {
					status:1,
					id:row.id
				}
				$.ajax({
                    type:'POST',
                    dataType:'json',
                    url:baseUrl+'/sys/config/update?token='+_this.token,
                    data:JSON.stringify(params),
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
                        	_this.getlist()
                        }
                    }
                });
			},
			stop(index,row){
				const _this = this;
				const params = {
					status:0,
					id:row.id
				}
				$.ajax({
                    type:'POST',
                    dataType:'json',
                    url:baseUrl+'/sys/config/update?token='+_this.token,
                    data:JSON.stringify(params),
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
                        	_this.getlist()
                        }
                    }
                });
			},
            handleSizeChange(val){
                this.pSize = val
                this.getlist()
            },
			handleCurrentChange(val) {
				this.currentPage = val;
				this.getlist();
			},
			formatterStatus(row,column){
                if(row.status === '0'){
                	return '关闭'
                }else if(row.status === '1'){
                	return  '开启'
                }
            },
            formatterDel(row,column){
                if(row.del === '0'){
                	return '不删除'
                }else if(row.del === '1'){
                	return  '逻辑删除'
                }
            },
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