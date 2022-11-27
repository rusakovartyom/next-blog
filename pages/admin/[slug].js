import { useState } from 'react';
import { useRouter } from 'next/router';
import { firestore, auth, serverTimestamp } from '../../lib/firebase';
import { useDocumentData } from 'react-firebase-hooks/firestore';
import { useForm } from 'react-hook-form';
import toast from 'react-hot-toast';

import Link from 'next/link';
import ReactMarkdown from 'react-markdown';
import AuthCheck from '../../components/AuthCheck';
import Button from '../../components/Button';
import ImageUploader from '../../components/ImageUploader';

import styles from './styles.module.css';

const AdminPostEdit = () => {
  return (
    <div>
      <AuthCheck>
        <PostManager />
      </AuthCheck>
    </div>
  );
};

const PostManager = () => {
  // For toggling between edit mode and preview mode
  const [preview, setPreview] = useState(false);

  const router = useRouter();
  const { slug } = router.query;

  // Post reference
  const postRef = firestore
    .collection('users')
    .doc(auth.currentUser.uid)
    .collection('posts')
    .doc(slug);
  // Listens to post in realtime
  const [post] = useDocumentData(postRef);

  return (
    <main className={styles.container}>
      {post && (
        <>
          <section>
            <h1>{post.title}</h1>
            <p>Post ID: {post.slug}</p>

            <PostForm
              postRef={postRef}
              defaultValues={post}
              preview={preview}
            />
          </section>
          <aside>
            <h1 className={styles.toolsTitle}>Tools</h1>
            <div className={styles.buttons}>
              <Button onClick={() => setPreview(!preview)}>
                {preview ? 'Edit' : 'Preview'}
              </Button>
              <Button blue>
                <Link href={`/${post.username}/${post.slug}`}>Live view</Link>
              </Button>
            </div>
            {!preview ? (
              <div>
                <p>Use Markdown to write and format posts.</p>
                <p>
                  Here&apos;s the{' '}
                  <a
                    className={styles.link}
                    href="https://github.com/adam-p/markdown-here/wiki/Markdown-Here-Cheatsheet"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    Markdown cheatsheet
                  </a>{' '}
                  for reference.
                </p>
              </div>
            ) : null}
          </aside>
        </>
      )}
    </main>
  );
};

const PostForm = ({ defaultValues, postRef, preview }) => {
  // Form config
  const {
    register,
    handleSubmit,
    reset,
    watch,
    formState: { errors, isDirty, isValid },
  } = useForm({
    defaultValues,
    mode: 'onChange',
  });

  const updatePost = async ({ content, published }) => {
    await postRef.update({
      content,
      published,
      updatedAt: serverTimestamp(),
    });

    reset({ content, published });

    toast.success('Post updated successfully!');
  };

  return (
    <form onSubmit={handleSubmit(updatePost)}>
      {preview && (
        <div className={styles.card}>
          <ReactMarkdown>{watch('content')}</ReactMarkdown>
        </div>
      )}

      <div className={preview ? styles.hidden : styles.controls}>
        <ImageUploader />
        <textarea
          name="content"
          {...register('content', {
            maxLength: { value: 20000, message: 'content is too long' },
            minLength: { value: 10, message: 'content is too short' },
            required: { value: true, message: 'content is required' },
          })}
        ></textarea>

        {errors.content && <p className="danger">{errors.content.message}</p>}
        <fieldset className={styles.checkbox}>
          <input type="checkbox" name="published" {...register('published')} />
          <label htmlFor="published">Published</label>
        </fieldset>
        {/* Disables button if form is not valid or user didn't interact with it */}
        <Button green type="submit" disabled={!isDirty || !isValid}>
          Save changes
        </Button>
      </div>
    </form>
  );
};

export default AdminPostEdit;
