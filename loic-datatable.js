Polymer({
    is: 'loic-datatable',
    properties: {
        dataTable: {
            type: Object,
            value: {
                Order: {
                    Member: "",
                    Sens: 1 //1 = ASC ; -1 = DESC
                },
                Header: [
                    {
                        Value: "ID",
                        DisplayMember: "id",
                        filter: "",
                        filterOn: false
                    }, {
                        Value: "Civilité",
                        DisplayMember: "civ",
                        filter: "",
                        filterOn: true
                    }, {
                        Value: "Nom",
                        DisplayMember: "name",
                        filter: "",
                        filterOn: true
                    }, {
                        Value: "Prénom",
                        DisplayMember: "firstname",
                        filter: "",
                        filterOn: true
                    }, {
                        Value: "Formation",
                        DisplayMember: "formation",
                        filter: "",
                        filterOn: true
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
            notify: true
        },
        itemFiltered: {
            type: Object,
            readOnly: true
        },
        withBootstrap: {
            type: Boolean,
            notify: true,
            value: true
        },
        currentPage: {
            type: Number,
            value: 0
        },
        displayByPage: {
            type: Number,
            value: 5
        },
        customClass: {
            type: String,
            notify: true,
            value: ""
        },
        DisplayedItems: {
            type: Array,
            computed: "getItems(itemFiltered, displayByPage, currentPage, dataTable.Order.*)"
        }
        //emptyContent:{
        //    type: Boolean,
        //    readOnly: true,
        //    value:false
        //}
    },
    observers: [
        'updateFilter(dataTable.Header.*)'
    ],
    ready: function () {
        //this._setEmptyContent(Polymer.dom(this).children.length === 0);
        //if(!this.emptyContent){
        //    this.initData();
        //}
        this._setItemFiltered(this.dataTable.Items);
    },
    initData: function () {
        var headers = [], items = [], table = this.querySelector("table");
        var ths = table.querySelectorAll("thead tr th");
        for (var i = 0; i < ths.length; i++) {
            var header = ths.item(i);
            headers.push({
                DisplayMember: header.innerText,
                Value: header.innerText
            });
        }
        ths = table.querySelectorAll("tbody tr");
        for (var i = 0; i < ths.length; i++) {
            var prop = {};
            var tds = ths.item(i).querySelectorAll("td");
            for (var j = 0; j < tds.length; j++) {
                var header = headers[j];
                prop[header.DisplayMember] = tds.item(j).innerText;
            }
            items.push(prop);
        }

        if (headers.length > 0)
            this.dataTable.Header = headers;
        if (items.length > 0)
            this.dataTable.Items = items;
    },
    getIn: function (item, member) {
        return item[member];
    },
    unique: function (array, member) {
        var a = [];
        array.forEach(function (item) {
            if (a.indexOf(item[member]) === -1)
                a.push(item[member]);
        });
        return a;
    },
    changeSelectFilter: function (e, a) {
        e.model.set("header.filter", e.target.value);
    },
    updateFilter: function(filter){
        this._filter();
    },
    getItems: function (array, nb, page, order) {
        var a = [];
        this.order(array, order.base).forEach(function (item, index) {
            if (
                index >= (page * nb)
            )
                if (a.length < nb)
                    a.push(item);
        });
        return a;
    },
    pageDown: function () {
        if (this.currentPage > 0)
            this.currentPage--;
    },
    pageUp: function () {
        if (this.currentPage < (this.itemFiltered.length / this.displayByPage))
            this.currentPage++;
    },
    currentPageDisplay: function (page) {
        return page + 1;
    },
    getNbPage: function (itemFiltered, displayByPage) {
        return parseInt(itemFiltered.length / displayByPage, 10) + 1;
    },
    reorder: function (e) {
        var member = e.model.get("header.DisplayMember"), inverse = this.dataTable.Order.Member === member;
        if (inverse) {
            if (this.dataTable.Order.Sens === 1)
                this.set("dataTable.Order.Sens", -1);
            else if (this.dataTable.Order.Sens === -1)
                this.set("dataTable.Order.Sens", 1);
        }
        this.set("dataTable.Order.Member",member);
    },
    _filter: function () {
        var header = this.dataTable.Header;
        this._setItemFiltered(this.dataTable.Items.filter(function (item) {
            var ret = true;
            header.forEach(function (a) {
                if (a.filter) {
                    ret = ret && item[a.DisplayMember] == a.filter;
                }
            });
            return ret;
        }));
    },
    isFiltered: function (header, filter) {
        return header.filter == filter ? "selected" : "";
    },
    order: function (array, order) {
        var a = array.sort(function (current, next) {
            if (order.Sens === 1) {
                if (current[order.Member] < next[order.Member])
                    return -1;
                if (current[order.Member] > next[order.Member])
                    return 1;
                return 0;
            } else if (order.Sens === -1) {
                if (current[order.Member] > next[order.Member])
                    return -1;
                if (current[order.Member] < next[order.Member])
                    return 1;
                return 0;
            }
        });
        return a;
    }
});