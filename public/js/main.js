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

    function initMap() {
        var uluru = {lat: 30.848424, lng: -83.289238};
        var map = new google.maps.Map(document.getElementById('map'), {
          zoom: 15,
          center: uluru
        });
        var marker = new google.maps.Marker({
          position: uluru,
          map: map
        });
      }
    initMap();
});