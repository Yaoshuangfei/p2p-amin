<template>
	<section>
		<el-col :span="24" class="toolbar" style="padding-bottom: 0px;background: #fff">
			<el-form :inline="true">
				<el-form-item label="活动类型">
				    <el-input v-model="activityType"></el-input>
				</el-form-item>
				<el-form-item label="奖品名称">
				    <el-input v-model="prizeName" @keyup.enter.native="keyLogin"></el-input>
				</el-form-item>
				<el-form-item label="奖品类型">
					<el-select v-model="prizeType" clearable>
				      <el-option v-for="item in options" :label="item.label" :value="item.value">
				      </el-option>
				    </el-select>
				</el-form-item>
				<el-form-item label="时间">
					<el-date-picker
				      v-model="value"
				      type="daterange"
				      placeholder="选择时间范围">
				    </el-date-picker>
				</el-form-item>
				<el-form-item>
					<el-button type="primary" v-on:click="getlist">查询</el-button>
				</el-form-item>
				<el-form-item style="float: right;">
					<el-button type="primary" v-on:click="addShow">新增奖品</el-button>
				</el-form-item>
			</el-form>
		</el-col>
		<el-table :data="list" highlight-current-row v-loading="listLoading" style="width: 100%;min-width: 1080px;">
			<el-table-column type="index" width="60px">
			</el-table-column>
			<el-table-column prop="prizeName" label="奖品名称" width="100px">
			</el-table-column>
			<el-table-column prop="prizeType"  label="奖品类型" :formatter='prizeTypeInt'>
			</el-table-column>
			<el-table-column prop="prizeValue"  label="奖品价值">
            </el-table-column>
            <el-table-column prop="sort"  label="奖品序号">
            </el-table-column>
            <el-table-column prop="stock"  label="库存总量">
            </el-table-column>
            <el-table-column prop="leftStock"  label="剩余库存量">
            </el-table-column>
			<el-table-column prop="atleastInvest"  label="最低投资额">
            </el-table-column>
            <el-table-column prop="actActivityType"  label="活动类型" width="150px">
			</el-table-column>
			<el-table-column prop="payRate" label="付费概率" width="100px">
			</el-table-column>
			<el-table-column prop="freeRate"  label="免费概率" width="100px">
			</el-table-column>
			<el-table-column prop="status" label="状态" :formatter='statusInt'>
			</el-table-column>
			<el-table-column label="操作">
				<template scope="scope">
					<el-button type="text" v-if='scope.row.status === "0"' size="small" @click="showBtn(scope.$index, scope.row)">启用</el-button>
					<el-button type="text" v-if='scope.row.status === "1"' size="small" @click="hiddenBtn(scope.$index, scope.row)">禁用</el-button>
					<el-button type="text" size="small" @click="deletBtn(scope.$index, scope.row)">修改</el-button>
				</template>
			</el-table-column>
		</el-table>
		<el-dialog title="新增奖品" v-model="addD" :close-on-click-modal="false"">
			<el-form label-width="150px" style="margin-left: 25%;">
				<el-form-item label="奖品名字：">
                    <el-input v-model="prizeName" style="width: 260px;" type="text"></el-input> 
                </el-form-item>
                <el-form-item label="奖品类型：">
                    <el-select v-model="prizeType" placeholder="请选择">
                    <el-option
                      v-for="item in options"
                      :key="item.value"
                      :label="item.label"
                      :value="item.value">
                    </el-option>
                  </el-select>
                </el-form-item>
				<el-form-item label="奖品中奖概率(免费)：">
                    <el-input v-model="freeRate" style="width: 260px;" type="text"></el-input> 
                </el-form-item>
                <el-form-item label="付费抽奖概率：">
                    <el-input v-model="payRate" style="width: 260px;" type="text"></el-input> 
                </el-form-item>
                <el-form-item label="奖品价值(元)：">
                    <el-input v-model="prizeValue" style="width: 260px;" type="text"></el-input> 
                </el-form-item>
				<el-form-item label="排序：">
                    <el-input v-model="sort" style="width: 260px;" type="text"></el-input> 
                </el-form-item>
                <el-form-item label="库存总量：">
                    <el-input v-model="stock" style="width: 260px;" type="text"></el-input> 
                </el-form-item>
                <el-form-item label="最低投资额(元)：">
                    <el-input v-model="atleastInvest" style="width: 260px;" type="text"></el-input> 
                </el-form-item>
				<el-form-item label="活动类型">
					<el-select v-model="actActivityType" placeholder="请选择">
				    <el-option
				      v-for="item in newOption"
				      :key="item.value"
				      :label="item.label"
				      :value="item.value">
				    </el-option>
				  </el-select>
				</el-form-item>
				<el-form-item label="活动类型id：">
                    <el-input v-model="actActivityId" style="width: 260px;" type="text"></el-input> 
                </el-form-item>
		    </el-form>
            <div slot="footer" class="dialog-footer" style="text-align: center;">
                <el-button type="primary" @click.native="Upload">确认</el-button>
                <el-button type="primary" @click.native="addD = false">取消</el-button>
            </div>
        </el-dialog>
		<el-col :offset="1" :xs="10" :sm="10" :md="10" :lg="10" style="margin-top: 20px;">
			
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
                list:[],
                prizeType:'',
                prizeName:'',
                activityType:'',
                value:'',
                insertTimeSt:'',
                insertTimeEt:'',
                prizeName:'',
                prizeType:'',
                freeRate:'',
                payRate:'',
                prizeValue:'',
                sort:'',
                stock:'',
                atleastInvest:'',
                actActivityType:'',
                actActivityId:'',
				options: [{
		          value: '0',
		          label: '虚拟奖品'
		        },{
		          value: '1',
		          label: '实物奖品'
		        }],
                newOption: [{
                  value: '0',
                  label: '否'
                },{
                  value: '1',
                  label: '是'
                }],
				listLoading: false,
				editLoading: false,
				addD:false,
                formData: new FormData(),
                fileImg: '',
                name:'',
                loading:false,
                upSize:0,
                progressShou:false,
                page:1
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
				$.ajax({
                    type:'GET',
                    dataType:'json',
                    url:baseUrl+'/act/actprize/listPrize?pageSize=20&token='+_this.token+'&currentPage='+_this.page+'&prizeType=',
                    contentType:'application/json;charset=utf-8',
                    error: function (XMLHttpRequest, textStatus, errorThrown) {},
                    success:function(data){
                        if(data.code === 200){
                        	_this.$message({
                                message: data.message,
                                type: 'success',
                                duration:1000
                            });
                            _this.list = data.data.pageUtils.list
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
			addShow(){
				this.addD = true
			},
			Upload(){
            	this.$confirm('确认新增该奖品么?', '提示', {
                }).then(() => {
					const _this = this
					$.ajax({
	                    type:'POST',
	                    dataType:'json',
	                    url:baseUrl+'/act/actprize/savePrize?token='+_this.token+'&prizeName='+_this.prizeName+'&prizeType='+_this.prizeType+'&freeRate='+_this.freeRate+'&payRate='+_this.payRate+'&prizeValue='+_this.prizeValue+'&sort='+_this.sort+'&stock='+_this.stock+'&atleastInvest='+_this.atleastInvest,
	                    contentType:'application/json;charset=utf-8',
	                    error: function (XMLHttpRequest, textStatus, errorThrown) {},
	                    success:function(data){
	                        if(data.code === 200){
	                        	_this.$message({
	                                message: data.message,
	                                type: 'success',
	                                duration:1000
	                            });
	                            // _this.getlist()
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
		    //包上传
            upload (event) {
                this.formData = new FormData()
                let file = event.target.files
                // console.log(file)
                this.formData.append('file',file[0])
                // this.submitUpload()
                this.name = file[0].name
            },
            //添加
            submitUpload(){
                const _this = this
                $.ajax({
                    type:'POST',
                    dataType:'json',
                    url:baseUrl+'/sys/sysVersions/releaseVersion?token='+_this.token+'&platform='+_this.platform+'&appVersion='+_this.appVersion+'&fileSize='+_this.fileSize+'&updateUrl='+_this.updateUrl+'&type='+_this.type+'&content='+_this.content,
                    // data:data,
                    contentType:'application/json;charset=utf-8',
                    error: function (XMLHttpRequest, textStatus, errorThrown) {},
                    success:function(data){
                        // console.log(data)
                        if(data.code === 200){
                            _this.$message({
                              message: data.message,
                              type: 'success',
                              duration:1000
                            });
                            for (var i = 0; i < state.tagArry.length; i++) {
                                if(state.tagArry[i].path === '版本展示'){
                                    state.id = i
                                    break;
                                }
                            }
                            _this.$router.push({ path: '/version_versionShow' });
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
            prizeTypeInt(row,column){
                if(row.prizeType === '0'){
                	return '虚拟奖品'
                }else if(row.prizeType === '1'){
                	return '实物奖品'
                }
            },
            statusInt(row,column){
                if(row.prizeType === '0'){
                	return '无效'
                }else if(row.prizeType === '1'){
                	return '有效'
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