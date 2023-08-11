document.addEventListener('DOMContentLoaded', () => {
    const dropArea = document.getElementById('dropArea');
    const fileInput = document.getElementById('fileInput');
    const previewImage = document.getElementById('previewImage');
    const submitButton = document.getElementById('submitButton');
    const cancelButton = document.getElementById('cancelButton');
    const uploadForm = document.getElementById('uploadForm');

    let selectedFile = null; // To track the selected file

    dropArea.addEventListener('dragover', (e) => {
        e.preventDefault();
        dropArea.classList.add('drop-area-hover');
    });

    dropArea.addEventListener('dragleave', () => {
        dropArea.classList.remove('drop-area-hover');
    });

    dropArea.addEventListener('drop', (e) => {
        e.preventDefault();
        dropArea.classList.remove('drop-area-hover');

        selectedFile = e.dataTransfer.files[0];
        console.log(selectedFile);
        handleFile(selectedFile);


        // Append the dropped file to the FormData object
        const formData = new FormData();
        formData.append('file', selectedFile);

    });

    fileInput.addEventListener('change', () => {
        selectedFile = fileInput.files[0];
        console.log(selectedFile);
        handleFile(selectedFile);
        console.log("In fileInput")
    });

    cancelButton.addEventListener('click', () => {
        selectedFile = null;
        previewImage.style.display = 'none';
        submitButton.setAttribute('disabled', 'disabled');
        cancelButton.setAttribute('disabled', 'disabled');
        fileInput.value = ''; // Reset the file input
    });

    function handleFile(file) {
        console.log(file)
        console.log("beginning")
        if (file && isValidImage(file)) {
            const reader = new FileReader();
            reader.onload = (event) => {
                previewImage.src = event.target.result;
                previewImage.style.display = 'block';
                submitButton.removeAttribute('disabled');
                cancelButton.removeAttribute('disabled');
            };
            reader.readAsDataURL(file);
        } else {
            previewImage.style.display = 'none';
            submitButton.setAttribute('disabled', 'disabled');
            cancelButton.setAttribute('disabled', 'disabled');
            selectedFile = null; // Reset selected file if invalid
            fileInput.value = ''; // Reset the file input
        }
    }

    function isValidImage(file) {
        const allowedExtensions = ['jpeg', 'jpg', 'png', 'gif'];
        const fileExtension = file.name.split('.').pop().toLowerCase();
        return allowedExtensions.includes(fileExtension);
    }

   
});
