# FRONTEND
1. En el frontend, tanto para **Register** como para **MangaForm**, se utiliza un formulario para enviar la imagen al servidor Firebase utilizando un componente HTML <form> y el atributo encType="multipart/form-data".

2. El componente de formulario **MangaForm** y **Register** contienen un campo de entrada de archivo (<input type="file">) que está referenciado mediante el uso de **useRef()**. Al enviar el formulario, se crea un objeto FormData que contiene el archivo seleccionado y se envía al servidor utilizando la biblioteca Axios.
  * const formData = new FormData();
    formData.append('title', title.current.value);
    formData.append('category_id', category.current.value);
    formData.append('cover_photo', cover_photo.current.files[0]);
    formData.append('description', description.current.value); 