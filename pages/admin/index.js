import { useState, useContext } from 'react';
import { UserContext } from '../../lib/context';
import { useRouter } from 'next/router';
import { firestore, auth, serverTimestamp } from '../../lib/firebase';
import { useCollection } from 'react-firebase-hooks/firestore';
import kebabCase from 'lodash.kebabcase';
import toast from 'react-hot-toast';

import AuthCheck from '../../components/AuthCheck';
import PostFeed from '../../components/PostFeed';

import styles from './styles.module.css';

const AdminPostsPage = () => {
  return (
    <main>
      <AuthCheck>
        <PostList />
        <CreateNewPost />
      </AuthCheck>
    </main>
  );
};

const PostList = () => {};
const CreateNewPost = () => {};

export default AdminPostsPage;
