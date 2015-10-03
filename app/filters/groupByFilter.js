//http://stackoverflow.com/questions/17667610/ng-repeat-ng-show-if-previous-item-field-value-different#17670596

angular
.module('better-vbl')
.filter("groupBy", function() {
    var mArr = null,
        mGroupBy = null,
        mRetArr = null,
        getMemoArr = function(arr, groupBy) {
            var ret = {};
            angular.forEach(arr, function(item){
                var groupValue = item[groupBy];
                if(ret[groupValue]) {
                    ret[groupValue].push(item);
                } else {
                    ret[groupValue] = [item];
                }
            });
            return ret;
        };
    return function(arr, groupBy) {
        var newMemoArr = getMemoArr(arr, groupBy);
        if(mGroupBy !== groupBy || !angular.equals(mArr, newMemoArr)) {
            mArr = newMemoArr;
            mGroupBy = groupBy;
            mRetArr = [];
            var groups = {};
            angular.forEach(arr, function(item) {
                var groupValue = item[groupBy]
                if(groups[groupValue]) {
                    groups[groupValue].items.push(item);
                } else {
                    groups[groupValue] = {
                        items: [item]
                    };
                    groups[groupValue][groupBy] = groupValue;
                    mRetArr.push(groups[groupValue]);
                }
            });
        }
        return mRetArr;
    };
});