$('.flickr-album').each(function() {
	const $album = $(this),
			albumId = $album.data('album-id');

	$.ajax({
		method: 'GET',
		url: 'https://flickr.com/services/rest',
		dataType: 'jsonp',
		data: {
			method: 'flickr.photosets.getPhotos',
			api_key: 'f712681f1e81bd3ab43bb63f6cee1c1a',
			photoset_id: albumId,
      format: 'json',
      // per_page: 5
		}
	});
});

var jsonFlickrApi = function (data) {
  const $album = $(`[data-album-id='${data.photoset.id}']`);

	for(var i = 0; i < data.photoset.photo.length; i++) {
    const photo = data.photoset.photo[i];
    const baseUrl = `https://c2.staticflickr.com/${photo.farm}/${photo.server}/${photo.id}_${photo.secret}`;
    const imageUrl = `${baseUrl}_b.jpg`;
    const $img = $('<img/>')
      .attr('src', imageUrl)
      .attr('alt', photo.title);
    $album.append($img);
	}
}
