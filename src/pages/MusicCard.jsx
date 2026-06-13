// import { Link } from "react-router-dom";
// import { Typography, Card, CardContent, CardMedia } from "@mui/material";
// import { CheckCircle } from "@mui/icons-material";

// import { demoThumbnailUrl, demoMusicUrl, demoMusicTitle} from "../utilities/constants";

// const MusicCard = ({ music: { id: { musicId }, snippet } }) => {
//     return (
//         <Card sx={{ width: { md: "320px", xs: "100%" }, boxShadow: "none", borderRadius: "none"}}>
//             <Link to={musicId ? `/music/${musicId}` : demoMusicUrl}>
//                 <CardMedia 
//                     image={snippet?.thumbnails?.high?.url}
//                     alt={snippet?.title}
//                     sx={{ width: 358, height: 180 }}
//                 />
//             </Link>
//             <CardContent sx={{ backgroundColor: "#1e1e1e", height: "106px" }}>
//                 <Link>
//                     <Typography variant="subtitle1" fontWeight="bold" color="#FFF">
//                         {snippet?.title.slice(0, 60) || demoMusicTitle.slice(0, 60)}
//                     </Typography>
//                 </Link>
//             </CardContent>
//         </Card>
//     )
// }

// export default MusicCard