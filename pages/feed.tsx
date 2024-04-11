import type {InferGetServerSidePropsType, NextPage} from "next";
import {Grid} from "@mui/material";
import Head from "next/head";
import {Comments, Post} from "../types";
import Card from "../components/Post";

export const getServerSideProps = async () => {
    const res = await fetch('https://jsonplaceholder.typicode.com/posts')
    const posts: Post[] = await res.json();

    const comments: Comments[] = await Promise.all(posts.map(async post => {
        const res = await fetch(`https://jsonplaceholder.typicode.com/posts/${post.id}/comments`)
        return await res.json()
    }));

    const postsWithComments = posts.map((post) => {
        return {
            ...post,
            comments: comments.find(comment => comment[0].postId === post.id) ?? []
        }
    })
    return {props: {postsWithComments}}
}

const Feed: NextPage<InferGetServerSidePropsType<typeof getServerSideProps>> = ({postsWithComments}) => {
    return (
        <>
            <Head>
                <title>Feed - posts</title>
            </Head>
            <main>
                <Grid
                    container
                    spacing={0}
                    direction="column"
                    alignItems="center"
                    justifyContent="center"
                    sx={{minHeight: '100vh'}}
                >
                    {postsWithComments.map(post => (
                        <Card key={post.id} {...post} />
                    ))}
                </Grid>
            </main>
        </>
    );
};

export default Feed;
