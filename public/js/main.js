$(document).ready(() => {
    $('.delete-article').on('click', (e) => {
        $target = $(e.target);
        //console.log($target.attr('data-id')); //grabs the data-id and appends to url
        const id = $target.attr('data-id');
        $.ajax({
            type: 'DELETE',
            url: '/articles/'+id,
            success: (response) =>{
                alert('Deleting Article');
                window.location.href='/';
            },
            error: (err) => {
                console.log(err);
            }
        });
    });
    var docs = JSON.parse($('body').attr('data-locations'));
    function initMap() {
        var uluru = {lat: 30.848424, lng: -83.289238};
        var map = new google.maps.Map(document.getElementById('map'), {
          zoom: 15,
          center: uluru
        });
        // docs.forEach( (marker) => {
        for (var i = 0; i < docs.length;i ++){
            console.log(docs[i]);
            var docz = docs[i];
            for (var j = 0; j < docz.length; j++){
                var data = {lat: docz[j].lat, lng: docz[j].long};
                console.log(docz[j].lat);
                console.log(data.lat + ' ' + data.lng)
                marker = new google.maps.Marker({
                    position: data,
                    map: map
                });
            }
        }
        // });
        var nevins = new google.maps.Marker({
          position: uluru,
          map: map
        });
        // var uluruR = {lat: 30.845162, lng: -83.291015};
        // var nevinsR = new google.maps.Marker({
        //     position: uluruR,
        //     map: map
        //   });
      }
    initMap();
});