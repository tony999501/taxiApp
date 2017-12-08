import Qs from 'qs'
export default{

	  url: '/route',
	  baseURL: 'http://47.52.43.78/',//http://localhost:8081///'http://47.52.43.78/',//baseURL: 'https://www.camclaim.cn/'
	  method:'GET',
	  
	  transformRequest: [function (data) {
		if(data){
			//为了避免qs格式化时对内层对象的格式化先把内层的对象转为
			data.CustData = JSON.stringify(data);
			//由于使用的form-data传数据所以要格式化
			data = Qs.stringify(data);
		}
	    return data;
	  }],

	  
	  transformResponse: [function (data) {
	      return data;
	  }],

	  headers: {
          'Content-Type':'application/x-www-form-urlencoded'
      },

	  
	  
	  paramsSerializer: function(params) {
	    return Qs.stringify(params)
	  },

	  
	timeout: 400000,

	  
	withCredentials: false, // default

	  
	responseType: 'json', // default

	 
	  
	onUploadProgress: function (progressEvent) {
	    // Do whatever you want with the native progress event
	},

	  
	onDownloadProgress: function (progressEvent) {
	    // Do whatever you want with the native progress event
	},

	  
	maxContentLength: 20000,

	  
	validateStatus: function (status) {
	    return status >= 200 && status < 300; // default
	},

	  
	maxRedirects: 5, // default
}