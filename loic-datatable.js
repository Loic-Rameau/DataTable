Polymer({
    is: 'loic-datatable',
    properties: {
        dataTable: {
            type: Object,
            value: {
                    Header: [
                        {
                            Value: "ID",
                            DisplayMember: "id",
                            filter: ""
                        }, {
                            Value: "Civilité",
                            DisplayMember: "civ",
                            filter: ""
                        }, {
                            Value: "Nom",
                            DisplayMember: "name",
                            filter: ""
                        }, {
                            Value: "Prénom",
                            DisplayMember: "firstname",
                            filter: ""
                        }, {
                            Value: "Formation",
                            DisplayMember: "formation",
                            filter: ""
                        }
                    ],
                    Items: [
                        {
                            id: 1,
                            name: "Foo",
                            firstname: "Bar",
                            formation: "C#",
                            civ: "M."
                        }, {
                            id: 2,
                            name: "Foo",
                            firstname: "Bar",
                            formation: "C++",
                            civ: "M."
                        }, {
                            id: 3,
                            name: "Foo",
                            firstname: "Bar",
                            formation: "PHP",
                            civ: "M."
                        }, {
                            id: 4,
                            name: "Bar",
                            firstname: "Foo",
                            formation: "PHP",
                            civ: "Mme"
                        }, {
                            id: 5,
                            name: "Bar",
                            firstname: "Foo",
                            formation: "HTML",
                            civ: "Mme"
                        }, {
                            id: 6,
                            name: "Bar",
                            firstname: "Foo",
                            formation: "SQL",
                            civ: "Mme"
                        }, {
                            id: 7,
                            name: "Toto",
                            firstname: "Tata",
                            formation: "SQL",
                            civ: "M."
                        }
                    ]
            },
            notify:true
        },
        itemFiltered:{
            type: Object,
            readOnly: true
        },
        withBootstrap: {
            type: Boolean,
            notify: true,
            value: true
        },
        currentPage:{
            type: Number,
            value: 0
        },
        displayByPage:{
            type: Number,
            value: 5
        },
        customClass: {
            type: String,
            notify: true,
            value: ""
        }
        //emptyContent:{
        //    type: Boolean,
        //    readOnly: true,
        //    value:false
        //}
    },
    ready:function() {
        //this._setEmptyContent(Polymer.dom(this).children.length === 0);
        //if(!this.emptyContent){
        //    this.initData();
        //}
        this._setItemFiltered(this.dataTable.Items);
    },
    initData:function(){
        var headers = [], items = [], table = this.querySelector("table");
        var ths = table.querySelectorAll("thead tr th");
        for(var i = 0; i < ths.length; i++){
            var header = ths.item(i);
            headers.push({
                DisplayMember: header.innerText,
                Value: header.innerText
            });
        }
        ths = table.querySelectorAll("tbody tr");
        for(var i = 0; i < ths.length; i++){
            var prop = {};
            var tds = ths.item(i).querySelectorAll("td");
            for(var j = 0; j < tds.length; j++){
                var header = headers[j];
                prop[header.DisplayMember] = tds.item(j).innerText;
            }
            items.push(prop);
        }

        if(headers.length > 0)
            this.dataTable.Header = headers;
        if(items.length > 0)
            this.dataTable.Items = items;
    },
    getIn: function (item, member) {
        return item[member];
    },
    unique:function(array, member){
        var a = [];
        array.forEach(function(item){
            if(a.indexOf(item[member]) === -1)
                a.push(item[member]);
        });
        return a;
    },
    changeSelectFilter:function(e, a){
        e.model.set("header.filter",e.target.value);
        this._filter();
    },
    getItems:function(array, nb, page){
        var a = [];
        array.forEach(function(item, index) {
            if(
                    index >= (page*nb)
            )
            if(a.length < nb)
                a.push(item);
        });
        return a;
    },
    pageDown:function(){
        if(this.currentPage > 0)
            this.currentPage--;
    },
    pageUp:function(){
        if(this.currentPage < (this.itemFiltered.length/this.displayByPage))
            this.currentPage++;
    },
    currentPageDisplay:function(page){return page+1;},
    getNbPage:function(itemFiltered, displayByPage){
        return parseInt(itemFiltered.length / displayByPage, 10) + 1;
    },
    reorder:function(e){
        this._setItemFiltered(this.dataTable.Items);
    },
    _filter:function(){
        var header = this.dataTable.Header;
        this._setItemFiltered(this.dataTable.Items.filter(function(item){
            var ret = true;
            header.forEach(function(a){
                if(a.filter){
                    ret = ret && item[a.DisplayMember] == a.filter;
                }
            });
            return ret;
        }));
    },
    isFiltered:function(header, filter){
        return header.filter == filter ? "selected": "";
    }
});