function STAFFLIST() {
    this.StfLst = [];
}

STAFFLIST.prototype.AddStaff = function (staff) {
    this.StfLst.push(staff);
}

STAFFLIST.prototype.FindStaffIndex = function (id) {
    for (var i = 0; i < this.StfLst.length; i++) {
        if (id === this.StfLst[i].Id) {
            return i
        }
    }
    return -1;
}

STAFFLIST.prototype.RemoveStaff = function (id) {
    var index = this.FindStaffIndex(id);
    this.StfLst.splice(index, 1);
}

STAFFLIST.prototype.FindStaff = function (key) {
    var arrFoundStaff = [];

    for (var i = 0; i < this.StfLst.length; i++) {
        if (isNaN(key) && this.StfLst[i].Name.toLowerCase().search(key.toLowerCase().trim()) !== -1) {
            arrFoundStaff.push(this.StfLst[i]);
        } else if (!isNaN(key) && this.StfLst[i].Id.search(key.trim()) !== -1) {
            arrFoundStaff.push(this.StfLst[i]);
        }
    }
    return arrFoundStaff;
}

