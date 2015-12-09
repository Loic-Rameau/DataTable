Polymer({
    is: 'loic-datatable',
    properties: {
        dataTable: {
            type: Object,
            value: {
                    Header: [
                        {
                            Value: "ID",
                            DisplayMember: "id"
                        }, {
                            Value: "Civilité",
                            DisplayMember: "civ"
                        }, {
                            Value: "Nom",
                            DisplayMember: "name"
                        }, {
                            Value: "Prénom",
                            DisplayMember: "firstname"
                        }, {
                            Value: "Formation",
                            DisplayMember: "formation"
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
                            id: 1,
                            name: "Foo",
                            firstname: "Bar",
                            formation: "C++",
                            civ: "M."
                        }, {
                            id: 1,
                            name: "Foo",
                            firstname: "Bar",
                            formation: "PHP",
                            civ: "M."
                        }, {
                            id: 1,
                            name: "Bar",
                            firstname: "Foo",
                            formation: "PHP",
                            civ: "Mme"
                        }, {
                            id: 1,
                            name: "Bar",
                            firstname: "Foo",
                            formation: "HTML",
                            civ: "Mme"
                        }, {
                            id: 1,
                            name: "Bar",
                            firstname: "Foo",
                            formation: "SQL",
                            civ: "Mme"
                        }, {
                            id: 1,
                            name: "Toto",
                            firstname: "Tata",
                            formation: "SQL",
                            civ: "M."
                        }
                    ]
            },
            notify:true
        },
        withBootstrap: {
            type: Boolean,
            notify: true,
            value: true
        },
        customClass: {
            type: String,
            notify: true,
            value: ""
        },
        emptyContent:{
            type: Boolean,
            readOnly: true,
            value:false
        }
    },

    ready:function() {
        this._setEmptyContent(Polymer.dom(this).children.length === 0);
        if(!this.emptyContent){
            this.initData();
        }
        this.majTableClass(this.withBootstrap, this.customClass);
    },
    majTableClass: function (withBootstrap, customClass) {
        var table = this.querySelector("table");
        console.log(table);
        if(table){
            if(withBootstrap){
                table.classList.add("table");
                table.classList.add("table-hover");
            }
            if(customClass !== "")
                table.classList.add(customClass);
        }
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
    }
});