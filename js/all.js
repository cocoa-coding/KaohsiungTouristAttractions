new Vue({
  el: '#vm',
  data: {
    kaohsiungData: null,
    allarea: [],
    hotArea: ['左營區','三民區','岡山區','甲仙區'],

    currentArea: '',
    allItem: true,
  },
  created(){
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

        let areName = [];
        for(let i = 0 ; self.kaohsiungData.length > i ; i++){
          areName.push(self.kaohsiungData[i].Zone);
        }
        self.allarea = [...(new Set(areName))];
      }
    },
    showList(){
      this.$el.querySelector('.options').style.display = "block";
    },
    hideList() {
      this.$el.querySelector('.options').style.display = "none";
    },
    clickArea(event) {
      // console.log(event)
      if (event.target.nodeName !== "A"){return};
      let eTarget = event.target.textContent;
      this.$el.querySelector('.areaContent h4').textContent = eTarget;
      this.$el.querySelector('.choiceArea ul>li>a').textContent = eTarget;
      this.currentArea = eTarget;
      this.allItem = false;
      this.hideList();
    },
  }
})  //end of vm