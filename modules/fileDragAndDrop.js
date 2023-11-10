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

if (isAdvancedUpload) {
    const uploadBox = document.querySelector('#file-upload-box');
    let droppedFiles = false;

    // Style form as drag n drop 
    uploadBox.classList.add('has-advanced-upload');

    const preventDefaults = (e) => {
        e.preventDefault();
        e.stopPropagation();
    };

    // Listen for drag n drop-related events 
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
        droppedFiles = e.dataTransfer.files;
    });
  }
  