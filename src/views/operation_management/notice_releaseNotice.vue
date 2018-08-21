<template>
	<section>
		<el-col  :xs="24" :sm="24" :md="24" :lg="24" style="margin:20px auto;margin-left: 25%;color: #20a0ff;font-size: 16px;">发布公告</el-col>
		<el-col :offset="1" :xs="22" :sm="22" :md="22" :lg="22" style="margin-top: 40px;border-bottom:1px solid #ddd;padding-bottom: 10px;">以下带<span style="color: red">*</span>为必选项</el-col>
		<el-col :offset="1" :xs="16" :sm="16" :md="16" :lg="16" style="margin-top: 20px;">
				<el-form label-width="150px"  :model="filters"  :rules="rules">.
					<el-form-item label="标题缩略图：">
						<input type="file" style="position:absolute;opacity:0;width:70px;height:30px;margin-right:10px"  @change="upload" id="fileInput">
						<button type="button" class="el-button el-button--primary el-button--small">
							<span>点击上传</span>
						</button>
						<!-- <button type="button" class="el-button el-button--primary el-button--small" id="btnClear" @click="clear">清空上传</button> -->
						<span style="display: block;font-size: 12px">{{ imageChange }}</span>
						<!--<button type="button" class="el-button el-button&#45;&#45;primary el-button&#45;&#45;small" id="btnClear" @click="clear">清空上传</button>-->
						<!--<span style="display: block;font-size: 12px">{{ imageChange }}</span>-->
					</el-form-item>
			       	<el-form-item label="公告标题：" prop="title">
						<el-input v-model="filters.title" style="width: 500px;" type="text"></el-input>
					</el-form-item>
					<el-form-item label="公告类型：" prop="title">
						<el-select v-model="filters.type" placeholder="请选择">
					    <el-option
					      v-for="item in options"
					      :key="item.value"
					      :label="item.label"
					      :value="item.value">
					    </el-option>
					  </el-select>
					</el-form-item>
					<el-form-item label="活动链接：" >
						<el-input v-model="filters.activityUrl" style="width: 500px;" type="text"></el-input>
					</el-form-item>
					<el-form-item label="描述：" prop="description">
						<el-input v-model="filters.description" style="width: 500px;" type="text"></el-input>
					</el-form-item>
					<el-form-item label="公告置顶：">
						<el-radio-group v-model="radio">
						    <el-radio :label="1">是</el-radio>
						    <el-radio :label="0">否</el-radio>
						</el-radio-group>
					</el-form-item>
					<el-form-item label="公告内容："  prop="title">
						<div id = 'editor-trigger' style="height: 480px"></div>
					</el-form-item>
					<el-col :span='24' style="margin-left:300px;">
						<!-- <el-button type="primary" @click.native="announcement" :loading="editLoading">预览</el-button> -->
						<el-button type="primary" @click.native="announcement" :loading="editLoading">发布</el-button>
					</el-col>
			    </el-form>
			</el-col>
	</section>
</template>

<script>
	import { state } from '../../vuex/state'
	import util from '../../common/js/util'
	import {baseUrl , editUser, addUser } from '../../api/api';
	import wangEditor from 'wangEditor'

	export default {
		data() {
			return {
                token:'',
                imgUrl:'',
                test_html:'',//富文本编辑器
                filters: {
                    title: '',
                    description:'',
                    titleUrl:'',
                    type:'',
                    content:'',
                    activityUrl:'',
                    top:''
                },
				radio: 1,
				checked: true,
				value:'',
				value1:'',
				value2:'',
				url:'',
				urls:'',
				options: [ {
		          value: '10',
		          label: '平台日常公告'
		        }, {
		          value: '20',
		          label: '活动公告'
		        }, {
		          value: '30',
		          label: '首页的小banner图标'
		        }],
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

				users: [],
				total: 0,
				page: 1,
				listLoading: false,
				sels: [],//列表选中列
				editFormVisible: false,//编辑界面是否显示
				editLoading: false,
				rules: {
					name: [
						{ required: true, message: '新闻标题', trigger: 'blur' }
					]
				},
				//编辑界面数据
				editForm:{},

				addbannerdiv: false,//新增界面是否显示
                modifybannerdiv: false,//新增界面是否显示
				addLoading: false,
				//新增界面数据
                rules:{
                    title: [
                        { required: true, message: '请输公告标题', trigger: 'blur' }
                    ],
                    description: [
                        { required: true, message: '请输入描述', trigger: 'blur' }
                    ]
                },
                formData: new FormData(),
                fileImg: ''
			}
		},
        computed: {
        	wangEditor,
            // 实时更新上传图片的名字，仅读取，值只须为函数
            imageChange: function () {
                return this.fileImg
            }
        },
		methods: {
            announcement(){
                const _this = this
                const params = {
                    // token:_this.token,
                    title:_this.filters.title,
                    description:_this.filters.description,
                    titleUrl:_this.filters.titleUrl,
                    type :_this.filters.type,
                    content:encodeURI(encodeURI(_this.test_html,"utf-8"),"utf-8"),
                    activityUrl:_this.filters.activityUrl,
                    top:_this.radio.toString()
                }
                // console.log(params)
                // console.log(_this.test_html)
                // ?token='+_this.token+'&title='+_this.filters.title+'&description='+_this.filters.description+'&titleUrl='+_this.filters.titleUrl+'&type='+_this.filters.type+'&content='+_this.test_html+'&activityUrl='+_this.filters.activityUrl+'&top='+_this.radio
                $.ajax({
                    type:'POST',
                    dataType:'json',
                    url:baseUrl+'/act/actnotice/save?token='+_this.token,
                    data:JSON.stringify(params),
                    // data:'',
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
                                if(state.tagArry[i].path === '公告展示'){
                                    state.id = i
                                    break;
                                }
                            }
                            _this.$router.push({ path: '/notice_noticeShow' });
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
//		    清空上传
            clear(){
                let btn = document.getElementById("btnClear");
                let files = document.getElementById("fileInput");
                this.fileImg = '';
                // for IE, Opera, Safari, Chrome
                if (files !== null && files.value) {
                    //     files.outerHTML = files.outerHTML;
                    // } else { // FF(包括3.5)
                    files.value = "";
                    this.formData = new FormData()
                }
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
                    this.submitUpload()
                } else {
                    this.fileImg = ''
                    // console.log('不存在file', file)
                    this.formData = new FormData()
                }
            },
            //添加
            submitUpload(){
                // this.$confirm('确认发布吗？', '提示', {}).then(() => {
                    const _this= this;
                    _this.$http.post(baseUrl+'/act/actbanner/upload?token='+this.token+'&type=2', _this.formData, {
                        progress(event) {
                        }
                    })
                        .then(response => {
                            // console.log(response)
                            const info = JSON.parse(response.bodyText);
                            // _this.filters.titleUrl = info.data[0].filePath
                            // _this.imgUrl = info.data[0].previewUrl
                            _this.filters.titleUrl = info.data[0].filePath
                            _this.imgUrl = info.data[0].previewUrl
                        }, error => _this.$emit('complete', 500, error.message))
                // });
            },
			getlist(){
				const _this = this;
                _this.orderInformation = [];
				const params = {
                    poType:''
				};
                var url = baseUrl+"/api/indexAdvert/find/page?pageNum="+_this.page+"&pageSize=10";
                var data =JSON.stringify(params);
                $.ajax({
                    type:'POST',
                    dataType:'json',
                    url:url,
                    data:data,
                    contentType:'application/json;charset=utf-8',
                    success:function(data){
                        if(!data.success){
                            alert(data.msg)
                        }else{
                        	// console.log(data)
                            var _length 	= data.data.list;
                            _this.total 	= data.data.total;
                            for (var i = 0; i < _length.length; i++) {
                                _this.orderInformation.push(_length[i]);
                            }
                        }
                    }
                });
			},
            initEditor(data) {
                const _this = this
                const editor = new wangEditor('editor-trigger')
                editor.config.uploadImgUrl = baseUrl+'/act/actbanner/upload?type=2&token='+_this.token
                // editor.config.uploadHeaders = {
                //     'contentType' : 'application/json;charset=utf-8'
                // }

                editor.config.menus = [
                    'source',
                    '|',
                    'bold',
                    'underline',
                    'italic',
                    'strikethrough',
                    'eraser',
                    'forecolor',
                    'bgcolor',
                    '|',
                    'quote',
                    'fontfamily',
                    'fontsize',
                    'head',
                    'unorderlist',
                    'orderlist',
                    'alignleft',
                    'aligncenter',
                    'alignright',
                    '|',
                    'link',
                    'unlink',
                    'table',
                    // 'emotion',
                    '|',
                    'img',
                    '|',
                    'undo',
                    'redo',
                    'fullscreen'
                ]
                editor.onchange = function () {
                    // 编辑区域内容变化时，实时打印出当前内容
                    _this.test_html = this.$txt.html()
                }
                editor.create()
            },
		},
		mounted() {
            this.token = sessionStorage.getItem('token')
            this.token = JSON.parse(this.token)
            // console.log(this.token)
            this.initEditor()
		}
	}
</script>

<style>
	.inputW:{
		width: 300px;
	}
</style>