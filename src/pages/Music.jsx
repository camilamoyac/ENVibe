import { Stack, Box } from "@mui/material";
import { MusicCard } from "./MusicCard"

const Music = ({ music }) => {
    return (
        <Stack direction="row" flexWrap="wrap" justifyContent="start" gap={2}>
            {music.map((item, index) => (
                <Box key={index}>
                    {item.id.musicId && <MusicCard music={item} />}
                </Box>
            ))}
        </Stack>
    )
}

export default Music