// import { Component } from "react";

// import { AiFillFire } from "react-icons/ai";

// import Loader from "react-loader-spinner";

// import { getCookie } from "../../Constants/StorageUtilities";

// import TrendingVideoCard from "../TrendingVideoCard";

// import ThemeContext from "../../Context/ThemeContext";

// import apiStatusConstants from "../../Constants/apiStatusConstants";

// import {
//   darkThemeFailureImgUrl,
//   lightThemeFailureImgUrl,
// } from "../../Constants/logoUrl";

// import Layout from "../Layout";

// import getAuthHeaders from "../../Constants/getAuthHeaders";

// import {
//   MainBody,
//   TrendingContainer,
//   TrendingMenuContainer,
//   IconContainer,
//   MenuHeading,
//   LoaderContainer,
//   FailureContainer,
//   FailureImg,
//   FailureText,
//   RetryButton,
//   VideosList,
//   TrendingMainContainer,
// } from "./styledComponents";

// class Trending extends Component {
//   state = {
//     videosList: [],
//     apiStatus: apiStatusConstants.initial,
//   };

//   componentDidMount = () => {
//     this.getVideos();
//   };

//   getVideos = async () => {
//     this.setState({ apiStatus: apiStatusConstants.inProgress });

//     const jwtToken = getCookie("jwt_token");
//     const url = "https://apis.ccbp.in/videos/trending";
//     const options = {
//       headers: getAuthHeaders(jwtToken),
//       method: "GET",
//     };

//     const response = await fetch(url, options);
//     const data = await response.json();

//     if (response.ok === true) {
//       const updatedData = data.videos.map((eachItem) => ({
//         id: eachItem.id,
//         channel: {
//           name: eachItem.channel.name,
//           profileImageUrl: eachItem.channel.profile_image_url,
//         },
//         publishedAt: eachItem.published_at,
//         thumbnailUrl: eachItem.thumbnail_url,
//         title: eachItem.title,
//         viewCount: eachItem.view_count,
//       }));
//       this.setState({
//         videosList: updatedData,
//         apiStatus: apiStatusConstants.success,
//       });
//     } else {
//       this.setState({
//         apiStatus: apiStatusConstants.failure,
//       });
//     }
//   };

//   successView = () => {
//     const { videosList } = this.state;

//     return (
//       <VideosList>
//         {videosList.map((each) => (
//           <TrendingVideoCard videoDetails={each} key={each.id} />
//         ))}
//       </VideosList>
//     );
//   };

//   failureView = () => (
//     <ThemeContext.Consumer>
//       {(value) => {
//         const { isDarkTheme } = value;
//         const theme = isDarkTheme ? "dark" : "light";
//         const imgUrl = isDarkTheme
//           ? darkThemeFailureImgUrl
//           : lightThemeFailureImgUrl;
//         return (
//           <FailureContainer>
//             <FailureImg src={imgUrl} alt="failure view" />
//             <FailureText theme={theme}>Oops! Something Went Wrong</FailureText>
//             <FailureText theme={theme} as="p">
//               We are having some trouble to complete your request. Please try
//               again
//             </FailureText>
//             <RetryButton type="button" onClick={this.getVideos}>
//               Retry
//             </RetryButton>
//           </FailureContainer>
//         );
//       }}
//     </ThemeContext.Consumer>
//   );

//   loader = () => (
//     <ThemeContext.Consumer>
//       {(value) => {
//         const { isDarkTheme } = value;
//         return (
//           <LoaderContainer className="loader-container" data-testid="loader">
//             <Loader
//               type="ThreeDots"
//               color={isDarkTheme ? "#ffffff" : "#000000"}
//               height="50"
//               width="50"
//             />
//           </LoaderContainer>
//         );
//       }}
//     </ThemeContext.Consumer>
//   );

//   renderUIBasedOnaAPIStatue = () => {
//     const { apiStatus } = this.state;

//     switch (apiStatus) {
//       case apiStatusConstants.success:
//         return this.successView();
//       case apiStatusConstants.failure:
//         return this.failureView();
//       case apiStatusConstants.inProgress:
//         return this.loader();
//       default:
//         return <></>;
//     }
//   };

//   render() {
//     return (
//       <ThemeContext.Consumer>
//         {(value) => {
//           const { isDarkTheme } = value;
//           const theme = isDarkTheme ? "dark" : "light";

//           return (
//             <>
//               <Layout>
//                 <TrendingMainContainer data-testid="trending" theme={theme}>
//                   <MainBody>
//                     <TrendingContainer>
//                       <TrendingMenuContainer theme={theme}>
//                         <IconContainer theme={theme}>
//                           <AiFillFire size={40} color="#ff0b37" />
//                         </IconContainer>
//                         <MenuHeading theme={theme}>Trending</MenuHeading>
//                       </TrendingMenuContainer>
//                       {this.renderUIBasedOnaAPIStatue()}
//                     </TrendingContainer>
//                   </MainBody>
//                 </TrendingMainContainer>
//               </Layout>
//             </>
//           );
//         }}
//       </ThemeContext.Consumer>
//     );
//   }
// }

// export default Trending;
