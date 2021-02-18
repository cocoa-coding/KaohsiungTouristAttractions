new Vue({
  el: '#vm',
  data: {
    kaohsiungData: null,
    allarea: [],
    hotArea: ['左營區','三民區','岡山區','甲仙區'],
    currentArea: '',
    allItem: true,

    mapArray: null,
    pageTotalArray : [1],
    onePageQua : 6,
    onePageData : []
  },
  mounted(){
    this.fetchAPI();
  },
  methods: {
    fetchAPI() {
      const xhr = new XMLHttpRequest();
      xhr.open('get' , 'https://raw.githubusercontent.com/hexschool/KCGTravel/master/datastore_search.json' , true);
      xhr.send(null);

      const self = this;
      xhr.onload = function() {
        self.kaohsiungData = JSON.parse(xhr.responseText).result.records;
        let areName = self.kaohsiungData.map(item => item.Zone)
        self.allarea = [...(new Set(areName))];
        self.mapArray = self.kaohsiungData.map(item => item)
        self.paginations();
        self.changePagination(1);
      }
    },
    showList(){
      this.$el.querySelector('.options').style.display = "block";
    },
    hideList() {
      this.$el.querySelector('.options').style.display = "none";
    },
    clickArea(event) {
      if (event.target.nodeName !== "A"){return};
      this.hideList();
      let eTarget = event.target.textContent;
      this.$el.querySelector('.areaContent h4').textContent = eTarget;
      this.$el.querySelector('.choiceArea ul>li>a').textContent = eTarget;
      this.currentArea = eTarget;
      this.allItem = false;

      this.mapArray = this.kaohsiungData.filter(item => item.Zone == eTarget);
      this.paginations();
      this.changePagination(1)
    },
    paginations(){
      //to initial
      this.pageTotalArray = [1];

      //cal all page
      let pageTotal = Math.ceil( this.mapArray.length / this.onePageQua );
  
      //all page push this.pageTotalArray
      for(let i = 0 ; i < pageTotal-1 ; i++){
        this.pageTotalArray.push(this.pageTotalArray.length+1)
      }
    },
    changePagination(pageNum){
      this.onePageData = [];
      //per page last num
      let maxNItemNum = pageNum * this.onePageQua;o
      //per page first num
      let minItemNum = maxNItemNum - this.onePageQua + 1 ;

      this.mapArray.forEach((item, index) => {
        //per item num+1
        let itemNum = index + 1 ;
        if ( itemNum >= minItemNum && itemNum <= maxNItemNum) {
          this.onePageData.push(item);
        }
      })
      let pageJsANode = this.$el.querySelectorAll('.pageJs a');
      for( let i = 0 ; i < pageJsANode.length ; i++){
        if(i == pageNum-1) {
          pageJsANode[i].style.color = "red";
        } else {
          pageJsANode[i].style.color = "black";
        }
      }
    }
  }
})  //end of vm