var app = new Vue({
    el: "#app",
    data: {
        mode: "list",
        memo: {
            id: null,
            content: null,
            regDate: null,
        },
        memos: [],
    },
    methods: {
        renew: function (val) {
            return JSON.parse(JSON.stringify(val));
        },
        open: function (id) {
            for (var i in this.memos) {
                if (this.memos[i].id === id) {
                    this.memo = this.renew(this.memos[i]);
                    break;
                }
            }
            this.mode = "edit";
        },
        write: function () {
            this.mode = "write";
            this.memo = {
                id: null,
                content: null,
                regDate: null,
            };
        },
        save: function () {
            if (this.mode === "write") {
                this.memos.push({
                    id: this.memos.length + 1,
                    content: this.memo.content,
                    regDate: new Date(),
                });
            } else if (this.mode === "edit") {
                for (let i in this.memos) {
                    if (this.memos[i].id === this.memo.id) {
                        this.memos[i] = this.renew(this.memo);
                        break;
                    }
                }
            }

            this.mode = "list";

            localStorage.setItem("memos", JSON.stringify(this.memos));
        },
        cancel: function () {
            this.mode = "list";
        },
    },
    created: function () {
        let memos = localStorage.getItem("memos");
        if (memos) {
            this.memos = JSON.parse(memos);
        }
    },
});
