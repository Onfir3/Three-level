
var vmsimulatedDATA = new Vue({
    el: "#vmsimulatedDATA",
    data: {
        simulatedDATA: { //模拟后台返回的数据 多规格
        "difference": [
            { //所有的规格可能情况都在这个数组里
              "id": "19",
              "price": "200.00",
              "stock": "19",
              "difference": "白,8GB+128GB,公开版"
            },
            {
              "id": "20",
              "price": "100.00",
              "stock": "29",
              "difference": "白,8GB+512GB,移动4G+"
            },
            {
              "id": "21",
              "price": "300.00",
              "stock": "10",
              "difference": "黑,8GB+128GB,公开版"
            },
            {
              "id": "22",
              "price": "900.00",
              "stock": "0",
              "difference": "黑,8GB+512GB,公开版"
            },
            {
              "id":"74",
              "price":"900.00",
              "stock":"10",
              "difference":"黑,8GB+512GB,移动4G+"
            },
            {
              "id": "23",
              "price": "600.00",
              "stock": "48",
              "difference": "绿,8GB+128GB,移动4G+"
            },
            {
              "id": "24",
              "price": "500.00",
              "stock": "40",
              "difference": "绿,8GB+512GB,公开版"
            },
            {
              "id": "78",
              "price": "500.00",
              "stock": "32",
              "difference": "绿,12GB+1TB,公开版"
            },
            {
              "id": "25",
              "price": "90.00",
              "stock": "0",
              "difference": "蓝,8GB+128GB,移动4G+"
            },
            {
              "id": "26",
              "price": "40.00",
              "stock": "20",
              "difference": "蓝,8GB+512GB,移动4G+"
            },
            {
              "id": "27",
              "price": "40.00",
              "stock": "12",
              "difference": "蓝,12GB+1TB,移动4G+"
            }
          ],
          "specifications": [
            { //这里是要被渲染字段
              "name": "颜色",
              "item": [
                {
                  "name": "黑",
                },
                {
                  "name": "白",
                },
                {
                  "name": "绿",
                },
                {
                  "name": "蓝",
                }
              ]
            },
            { 
              "name": "参数",
              "item": [
                {
                  "name": "8GB+128GB",
                },
                {
                  "name": "8GB+512GB",
                },
                {
                  "name": "12GB+1TB"
                }
              ]
            },
            {
              "name":"版本",
              "item":[
                {"name":"公开版"},
                {"name":"移动4G+"}
              ]
            }
          ]
        },
        selectArr: [], //存放被选中的值
        shopItemInfo: {}, //存放要和选中的值进行匹配的数据
        subIndex: [], //是否选中 因为不确定是多规格还是但规格，所以这里定义数组来判断
    },
    created: function () {
        var self = this;
        for (var i in self.simulatedDATA.difference) {
            self.shopItemInfo[self.simulatedDATA.difference[i].difference] = self.simulatedDATA.difference //修改数据结构格式，改成键值对的方式，以方便和选中之后的值进行匹配
            console.log(self.shopItemInfo[self.simulatedDATA.difference[i].difference] = self.simulatedDATA.difference[i])
        }
        self.checkItem();
    },
    
    mounted: function () {

    },
    methods: {
        specificationBtn: function (item, n, event, index) {
            var self = this;
            if (self.selectArr[n] != item) {
                self.selectArr[n] = item;
                self.subIndex[n] = index;

            } else {
                self.selectArr[n] = "";
                self.subIndex[n] = -1; //去掉选中的颜色 
            }
            self.checkItem();
        },
        checkItem: function () {
            var self = this;
            var option = self.simulatedDATA.specifications;
            var result = []; //定义数组存储被选中的值
            for (var i in option) {
                result[i] = self.selectArr[i] ? self.selectArr[i] : '';
                console.log(result)
            }
            for (var i in option) {
                var last = result[i]; //把选中的值存放到字符串last去
                for (var k in option[i].item) {
                    result[i] = option[i].item[k].name; //赋值，存在直接覆盖，不存在往里面添加name值
                    option[i].item[k].isShow = self.isMay(result); //在数据里面添加字段isShow来判断是否可以选择
                }
                result[i] = last; //还原，目的是记录点下去那个值，避免下一次执行循环时避免被覆盖

            }

            self.$forceUpdate(); //重绘
        },
        isMay: function (result) {
            for (var i in result) {
                if (result[i] == '') {
                    return true; //如果数组里有为空的值，那直接返回true
                } 
            }
            return this.shopItemInfo[result] && Number(this.shopItemInfo[result].stock) != 0
            // return this.shopItemInfo[result].stock == 0 ? false : true; //匹配选中的数据的库存，若不为空返回true反之返回false
        }

    }
})