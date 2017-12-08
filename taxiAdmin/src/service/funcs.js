export default{
    quicksort(arr,left,right){
        if(left < right){
            var key = arr[left];  //基准数
            var first = left;   //开始位置
            var last = right;  //结束位置

            while(first < last){
                while(first < last && arr[last]  >= key){
                    last--;
                }

                arr[first] = arr[last];
                
                while(first < last && arr[first] <= key){
                    first++;
                }

                arr[last] = arr[first];
            }
            arr[first] = key;
            this.quicksort(arr,left,first-1);
            this.quicksort(arr,first+1,right);
        }
    },
    // 深拷贝对象或者数组
    deepCopy(o) {
        if (o instanceof Array) {
            var n = [];
            for (var i = 0; i < o.length; ++i) {
                n[i] = this.deepCopy(o[i]);
            }
            return n;

        } else if (o instanceof Object) {
            var n = {}
            for (var i in o) {
                n[i] = this.deepCopy(o[i]);
            }
            return n;
        } else {
            return o;
        }
    }
}