import type {InferGetServerSidePropsType, NextPage} from "next";
import {Grid} from "@mui/material";
import Head from "next/head";
import Thumbnail from "../components/Thumbnail";

type Albums = {
    userId: number;
    id: number;
    title: string;
}

type Photos = {
    albumId: number;
    id: number;
    title: string;
    url: string;
    thumbnailUrl: string;
}[]

export const getServerSideProps = async () => {
    const res = await fetch('https://jsonplaceholder.typicode.com/albums')
    const albums: Albums[] = await res.json();
    const first10Albums = albums.slice(0, 10);

    const photos: Photos[] = await Promise.all(first10Albums.map(async album => {
        const res = await fetch(`https://jsonplaceholder.typicode.com/albums/${album.id}/photos`)
        return await res.json()
    }));

    const thumbnails = photos.flatMap((photoArray) => {
        return photoArray.map(({thumbnailUrl, title}) => ({thumbnailUrl, title}))
    })

    return {props: {thumbnails}}
}

const Vault: NextPage<InferGetServerSidePropsType<typeof getServerSideProps>> = ({thumbnails}) => {

    return (
        <>
            <Head>
                <title>Vault - thumbnails</title>
            </Head>
            <main>
                <Grid
                    container
                    spacing={0}
                    alignItems="center"
                    justifyContent="center"
                    sx={{minHeight: '100vh', minWidth: '100%'}}
                >
                    {thumbnails.map((thumbnail, index) => (
                        <Thumbnail key={`${thumbnail.thumbnailUrl} ${index}`} {...thumbnail} />
                    ))}
                </Grid>
            </main>
        </>
    );
};

export default Vault;
