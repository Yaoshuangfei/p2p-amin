// 应用初始状态
export const state = {
    count: 10,
    main: 100,
    loginID: false,
    accountId: '',
    accessToken: '',
    commissionLine:'',
    storeStatus:'',
    keys:false,
    keys_5:false,
    HTTPCODE: {
	    LOGINFAIL: 1000001, //返回值 登录错误
	    SUCCEED: 1000000, //返回值 成功(1)
	    FAIL: 1000100 //返回值 失败(0)
	},
    id:0,
    tagArry:[],
    type:''
}
   // $.ajaxSetup({ 
   //      xhrFields: {
   //          withCredentials: true
   //      }
   //  });
   //  $.ajaxSettings.beforeSend = function(xhr,request){
   //      var arrstr = document.cookie.split("; ");
   //      var token = null;
   //      for(var i = 0; i < arrstr.length; i++) {
   //          var temp = arrstr[i].split("=");
   //          if(temp[0] == 'token') {
   //              token = unescape(temp[1]);
   //          }
   //      }
   //      xhr.setRequestHeader('token', token);
   //  }
    

