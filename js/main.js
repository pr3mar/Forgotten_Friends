/**
 * Created by pr3mar on 16.05.2015.
 */
$("#calculate").click(function(){
    console.log('Welcome!  Fetching your information.... ');
    var d = new Date();
    d.setMonth(d.getMonth() - 3);
    FB.api('/me/posts',{'since': d.toISOString(),'limit': '500'}, function(response) {
        var data = {};
        for(el in response.data) {
            try {
                var likes = response.data[el].likes.data;
                var comments = response.data[el].comments.data;
                for (person in likes) {
                    if (likes[person].name in data) {
                        data[likes[person].name][0] += 1;
                    } else {
                        data[likes[person].name] = [1, 0];
                    }
                }
                for (person in comments) {
                    console.log(comments[person].from.name);
                    if (comments[person].from.name in data) {
                        data[comments[person].from.name][1] += 1;
                    } else {
                        data[comments[person].from.name] = [0, 1];
                    }
                }
            } catch(e) {
                //console.log("undefined");
            }
        }
        data = sortMapByValue(data);
        console.log("likes:", data);
    });
});

function sortMapByValue(map) {
    var tupleArray = [];
    for (var key in map) tupleArray.push([key, map[key]]);
    tupleArray.sort(function (a, b) { return a[0][1] > b[0][1] });
    return tupleArray;
}