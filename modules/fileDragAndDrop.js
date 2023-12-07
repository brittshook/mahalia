function isAdvancedUpload() {
    return (
      window.File &&
      window.FileReader &&
      window.FileList &&
      window.Blob &&
      'draggable' in document.createElement('div') &&
      'ondragstart' in window &&
      'ondrop' in window
    );
  }

console.log(isAdvancedUpload());

const uploadBox = document.querySelector('#file-upload-box');

if (isAdvancedUpload) {
    uploadBox.classList.add('has-advanced-upload');

    const preventDefaults = (e) => {
        e.preventDefault();
    };

    // Listen for drag n drop-related events 
    const dragEvents = ['drag', 'dragstart', 'dragend', 'dragover', 'dragenter', 'dragleave', 'drop'];
    
    uploadBox.addEventListener('drag', preventDefaults);
    uploadBox.addEventListener('dragstart', preventDefaults);
    uploadBox.addEventListener('dragend', preventDefaults);
    uploadBox.addEventListener('dragover', (e) => {
        console.log('is dragover');
        preventDefaults(e);
        uploadBox.classList.add('is-dragover');
    });
    uploadBox.addEventListener('dragenter', (e) => {
        console.log('is dragover');
        preventDefaults(e);
        uploadBox.classList.add('is-dragover');
    });
    uploadBox.addEventListener('dragleave', (e) => {
        preventDefaults(e);
        uploadBox.classList.remove('is-dragover');
    });
    uploadBox.addEventListener('drop', (e) => {
        preventDefaults(e);
        uploadBox.classList.remove('is-dragover');
        handleDrop(e);

    });
}

function handleDrop(e) {
    const fileInput = document.querySelector('#box-file');
    const files = e.dataTransfer.files;
    console.log(files);
    fileInput.files = files;
}