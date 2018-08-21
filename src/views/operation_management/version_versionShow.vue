 <template>
	<section>
		<!--工具条-->
		<!-- <el-col :span="24" class="toolbar" style="padding-bottom: 0px;background: #fff">
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
			</el-form>
		</el-col> -->

		<!--列表-->
		<el-table :data="list" highlight-current-row v-loading="listLoading" style="width: 100%;min-width: 1080px;">
			<el-table-column type="index">
			</el-table-column>
			<el-table-column prop="updateUrl" label="更新地址">
			</el-table-column>
			<el-table-column prop="appVersion" label="app版本号">
			</el-table-column>
			<el-table-column prop="type" label="类型">
			</el-table-column>
			<el-table-column prop="platform" label="平台类型顺序">
			</el-table-column>
			<el-table-column prop="content" label="版本说明">
			</el-table-column>
			<el-table-column prop="insertTime"  label="更新时间">
			</el-table-column>
		</el-table>

		<!--工具条-->
		<!-- <el-col :span="24" class="toolbar" style="background:#fff;">
			<el-pagination layout="total,prev, pager, next,jumper" @current-change="handleCurrentChange" :page-size="10" :total="total" style="float:right;">
			</el-pagination>
		</el-col> -->
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
				selectSubjectStatus: [
				{
					value:'0',
					label:'全部'
				},{
					value:'1',
					label:'待付款'
				},{
					value:'2',
					label:'待发货'
				},{
					value:'3',
					label:'已发货'
				},{
					value:'4',
					label:'待评价'
				},{
					value:'5',
					label:'退货'
				}],
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
				}
			}
		},
		methods: {
			getlist(){
				const _this = this
                var url = baseUrl+"/sys/sysVersions/versionShow?token="+_this.token
                $.ajax({
                    type:'GET',
                    dataType:'json',
                    url:url,
                    contentType:'application/json;charset=utf-8',
                    error: function (XMLHttpRequest, textStatus, errorThrown) {},
                    success:function(data){
                    	// console.log(data)
                        if(data.code === 200){
                            _this.list = data.data
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