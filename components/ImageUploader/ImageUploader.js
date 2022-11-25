import { useState } from 'react';
import { auth, storage, STATE_CHANGED } from '../../lib/firebase';

import Loader from '../Loader';

import styles from './style.module.css';

const ImageUploader = () => {
  // Uploading/not uploading
  const [uploading, setUploading] = useState(false);
  // Exact percentage of progress
  const [progress, setProgress] = useState(0);
  // Download URL
  const [downloadURL, setDownloadURL] = useState(null);

  // Creates a Firebase Upload Task
  const uploadFile = async (e) => {
    // Get the file
    const file = Array.from(e.target.files)[0];
    const extension = file.type.split('/')[1];

    // Makes reference to the storage bucket location
    const ref = storage.ref(
      `uploads/${auth.currentUser.uid}/${Date.now()}.${extension}`
    );
    setUploading(true);

    // Starts the upload
    const task = ref.put(file);

    // Listen to updates to upload task
    task.on(STATE_CHANGED, (snapshot) => {
      const pct = (
        (snapshot.bytesTransferred / snapshot.totalBytes) *
        100
      ).toFixed(0);
      setProgress(pct);
    });

    // Get downloadURL AFTER task resolves (Note: this is not a native Promise)
    task
      .then((d) => ref.getDownloadURL())
      .then((url) => {
        setDownloadURL(url);
        setUploading(false);
      });
  };

  return (
    <div className={styles.container}>
      <Loader show={uploading} />
      {uploading && <h3>{progress}%</h3>}

      {!uploading && (
        <>
          <label className={styles.button}>
            Upload image
            <input
              className={styles.input}
              type="file"
              onChange={uploadFile}
              accept="image/x-png, image/gif, image/jpeg"
            />
          </label>
        </>
      )}

      {downloadURL && (
        <code className={styles.uploadSnippet}>{`![alt](${downloadURL})`}</code>
      )}
    </div>
  );
};

export default ImageUploader;
