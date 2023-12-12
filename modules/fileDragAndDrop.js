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

const uploadBox = document.querySelector('#file-upload-box');

if (isAdvancedUpload) {
    uploadBox.classList.add('has-advanced-upload');

    const preventDefaults = (e) => e.preventDefault();

    uploadBox.addEventListener('drag', preventDefaults);
    uploadBox.addEventListener('dragstart', preventDefaults);
    uploadBox.addEventListener('dragend', preventDefaults);
    uploadBox.addEventListener('dragover', (e) => {
        preventDefaults(e);
        uploadBox.classList.add('is-dragover');
    });
    uploadBox.addEventListener('dragenter', (e) => {
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
    uploadBox.addEventListener('click', triggerFileInput);
} else {
    const uploadIcon = uploadBox.querySelector('i');
    const label = uploadBox.querySelector('label');

    uploadIcon.style.backgroundColor = 'var(--white100, #fff)';
    uploadIcon.style.color = 'var(--black, #121212)';
    uploadIcon.style.width = '115px';
    uploadIcon.style.height = '115px';
    uploadIcon.style.padding = '54px 0';
    uploadIcon.style.marginBottom = '15px';

    uploadIcon.addEventListener('click', triggerFileInput);
    label.addEventListener('click', triggerFileInput);
}

function handleDrop(e) {
    const fileInput = document.querySelector('#box-file');
    const files = e.dataTransfer.files;
    fileInput.files = files;
}

function triggerFileInput() {
    document.querySelector('#box-file').click();
  }

function updateFileLabel() {
    const fileInput = document.querySelector('#box-file');
    const fileLabel = document.querySelector('label[for="file"');
    const numFiles = fileInput.files.length;
    fileLabel.innerHTML = numFiles === 0 
        ? '<span class="black">Choose files</span><span class="box-dragndrop"> or drag here</span>' 
        : `<span class="black">${numFiles} file${numFiles !== 1 
            ? 's'
            : ''} uploaded</span>`
}

export { updateFileLabel };